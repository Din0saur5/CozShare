import { getCurrentTimestampWithTimezone } from './time.js'
const server = import.meta.env.VITE_URL
export async function createPost(userId, postType, media, caption, event_id = null) {
    const url = `${server}/posts`; // Replace with your actual API endpoint
    const postData = {
        user_id: userId,
        post_type: postType,
        media: media,
        caption: caption,
        event_id: event_id,
        created: getCurrentTimestampWithTimezone()
    };
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'include', // Include credentials like cookies, authorization headers
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Post created:', data);
        return data;
    } catch (error) {
        console.error('Error creating post:', error);
        throw error; // You can rethrow the error if you want to handle it outside this function
    }
}
