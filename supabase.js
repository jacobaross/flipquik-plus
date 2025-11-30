// Supabase Configuration
const SUPABASE_URL = 'https://ujihniveyyyddzevtyei.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqaWhuaXZleXl5ZGR6ZXZ0eWVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1MDQ1NDksImV4cCI6MjA4MDA4MDU0OX0.KHtXgqmk14q1B9qbvl0B4yvOTKUkvkxEP9y8punTtBc';

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// User ID management
function getUserId() {
    let userId = localStorage.getItem('headsup_user_id');
    if (!userId) {
        // Generate a unique ID for this user
        userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('headsup_user_id', userId);
    }
    return userId;
}

// Cloud sync functions
const CloudSync = {
    // Sync local decks to cloud
    async syncToCloud(localDecks) {
        try {
            const userId = getUserId();

            // Get existing cloud decks
            const { data: cloudDecks, error: fetchError } = await supabase
                .from('custom_decks')
                .select('*')
                .eq('user_id', userId);

            if (fetchError) throw fetchError;

            // Convert cloud decks to a map for easy lookup
            const cloudDeckMap = new Map();
            if (cloudDecks) {
                cloudDecks.forEach(deck => {
                    cloudDeckMap.set(deck.deck_id, deck);
                });
            }

            // Sync each local deck
            for (const localDeck of localDecks) {
                const cloudDeck = cloudDeckMap.get(localDeck.id);

                if (!cloudDeck) {
                    // Insert new deck
                    const { error: insertError } = await supabase
                        .from('custom_decks')
                        .insert({
                            user_id: userId,
                            deck_id: localDeck.id,
                            name: localDeck.name,
                            cards: localDeck.cards
                        });

                    if (insertError) throw insertError;
                } else {
                    // Update existing deck
                    const { error: updateError } = await supabase
                        .from('custom_decks')
                        .update({
                            name: localDeck.name,
                            cards: localDeck.cards,
                            updated_at: new Date().toISOString()
                        })
                        .eq('user_id', userId)
                        .eq('deck_id', localDeck.id);

                    if (updateError) throw updateError;
                }

                // Remove from map (remaining items will be deleted locally)
                cloudDeckMap.delete(localDeck.id);
            }

            return { success: true };
        } catch (error) {
            console.error('Error syncing to cloud:', error);
            return { success: false, error };
        }
    },

    // Load decks from cloud
    async loadFromCloud() {
        try {
            const userId = getUserId();

            const { data: cloudDecks, error } = await supabase
                .from('custom_decks')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: true });

            if (error) throw error;

            // Convert to local deck format
            const decks = cloudDecks.map(deck => ({
                id: deck.deck_id,
                name: deck.name,
                cards: deck.cards,
                custom: true
            }));

            return { success: true, decks };
        } catch (error) {
            console.error('Error loading from cloud:', error);
            return { success: false, error, decks: [] };
        }
    },

    // Delete deck from cloud
    async deleteFromCloud(deckId) {
        try {
            const userId = getUserId();

            const { error } = await supabase
                .from('custom_decks')
                .delete()
                .eq('user_id', userId)
                .eq('deck_id', deckId);

            if (error) throw error;

            return { success: true };
        } catch (error) {
            console.error('Error deleting from cloud:', error);
            return { success: false, error };
        }
    },

    // Merge local and cloud decks
    async mergeDecks() {
        try {
            // Load from both sources
            const localDecks = JSON.parse(localStorage.getItem('customDecks') || '[]');
            const cloudResult = await this.loadFromCloud();

            if (!cloudResult.success) {
                // Cloud failed, use local only
                return localDecks;
            }

            const cloudDecks = cloudResult.decks;

            // Create a map of all decks by ID
            const deckMap = new Map();

            // Add local decks
            localDecks.forEach(deck => {
                deckMap.set(deck.id, { ...deck, source: 'local' });
            });

            // Add cloud decks (will overwrite local if same ID)
            cloudDecks.forEach(deck => {
                deckMap.set(deck.id, { ...deck, source: 'cloud' });
            });

            // Convert map back to array
            const mergedDecks = Array.from(deckMap.values()).map(({ source, ...deck }) => deck);

            // Save merged decks locally
            localStorage.setItem('customDecks', JSON.stringify(mergedDecks));

            // Sync merged decks to cloud
            await this.syncToCloud(mergedDecks);

            return mergedDecks;
        } catch (error) {
            console.error('Error merging decks:', error);
            // Fallback to local decks on error
            return JSON.parse(localStorage.getItem('customDecks') || '[]');
        }
    }
};

// Export for use in app.js
window.CloudSync = CloudSync;
window.getUserId = getUserId;
