"use client";
import { UserDetailedContext } from '@/context/UserDetailedContext';
import { supabase } from '@/services/supabaseClient';
import React, { useContext, useEffect, useState } from 'react'; // Added useState import

function Provider({ children }) {
    const [user, setUser] = useState();

    useEffect(() => {
        const createNewUser = async () => {
            // Get current authenticated user
            const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();

            if (authError) {
                console.error('Error fetching user:', authError.message);
                return;
            }

            if (!authUser) {
                console.log('No authenticated user');
                return;
            }

            try {
                // Check if user exists in database
                const { data: existingUsers, error: selectError } = await supabase
                    .from('Users')
                    .select('*')
                    .eq('email', authUser.email);

                if (selectError) throw selectError;

                // Create new user if not found
                if (existingUsers?.length === 0) {
                    const { data: newUser, error: insertError } = await supabase // Changed to capture data
                        .from('Users')
                        .insert([{
                            name: authUser.user_metadata?.name || authUser.email,
                            email: authUser.email,
                            picture: authUser.user_metadata?.picture || null,
                        }])
                        .select(); // Added .select() to get the inserted record

                    if (insertError) throw insertError;

                    console.log('New user created successfully', newUser);
                    setUser(newUser[0]);
                    return;
                }

                // Set user state with existing user
                setUser(existingUsers[0]);
            } catch (error) {
                console.error('User creation error:', error.message);
            }

            // console.log('Auth User:', authUser); // Inspect the structure
        };

        // Listen for auth state changes
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (event === 'SIGNED_IN') {
                    await createNewUser();
                }
                else if (event === "SIGNED_OUT") {
                    setUser(null);
                }
            }
        );

        // Initial check on mount
        createNewUser();

        // Cleanup listener
        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    return (
        <UserDetailedContext.Provider value={{ user, setUser }}>
            <div>{children}</div>
        </UserDetailedContext.Provider>
    )

}

export default Provider;

export const useUser = () => {

    const context = useContext(UserDetailedContext);
    return context;
}