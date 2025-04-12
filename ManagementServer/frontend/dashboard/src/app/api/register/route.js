import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        // Get the request body
        const body = await req.json();
        
        // Forward to backend with proper credentials
        const response = await fetch('http://backend:5001/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: body.username,
                password: body.password
            })
        });
        
        const data = await response.json();
        
        // Forward the exact status code from the backend
        return NextResponse.json(data, { 
            status: response.status 
        });
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ 
            error: 'An error occurred during registration' 
        }, { 
            status: 500 
        });
    }
} 