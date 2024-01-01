"use client"

import React, { useEffect, useState } from "react"; // Import useEffect and useState
import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useAuthModal from "@/hooks/useAuthModel";

const AuthModal = () => {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const { session } = useSessionContext();
    const { onClose, isOpen } = useAuthModal();
    
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        if (session) {
            router.refresh();
            onClose();
        }
    }, [session, router, onClose])

    const onChange = (open: boolean) => {
        if (!open){
            onClose();
        }
    }
    
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(mediaQuery.matches);
        
        const handleChange = () => {
            setIsDarkMode(mediaQuery.matches);
        };
        
        mediaQuery.addEventListener('change', handleChange);
        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, []);
    
    return ( 
        <Modal
            title="Welcome back"
            description="Use test@test.com as email and test as password"
            isOpen = {isOpen}
            onChange={onChange}
        >
            <Auth
                theme={isDarkMode ? 'dark' : 'light'}
                magicLink
                providers={[]}
                supabaseClient={supabaseClient}
                appearance={{
                    theme: ThemeSupa,
                    style: {
                        button: {border: 'none'}
                    },
                    variables: {
                        default: {
                            colors: {
                                brand: '#404040',
                                brandAccent: '#e8526e',
                            }
                        }
                    }
                }}
            />
        </Modal>
     );
}
 
export default AuthModal;
