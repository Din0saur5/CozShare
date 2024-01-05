const server = import.meta.env.VITE_URL
export function createPost(userId, postType, media, caption, likes) {
    const url = `${server}/posts`; // Replace with your actual API endpoint
    const postData = {
        user_id: userId,
        post_type: postType,
        media: media,
        caption: caption,
        likes: likes
    };

    fetch(url, {
        method: 'POST',
        credentials: 'include', // Include credentials like cookies, authorization headers
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Post created:', data)
        return data
    })
    .catch(error => {
        console.error('Error creating post:', error);
    });
}


export function createEventPost(userId, postType, media, caption, likes, eventId) {
    const postUrl = `${server}/posts`; // Replace with your actual API endpoint

    const postData = {
        user_id: userId,
        post_type: postType,
        media: media,
        caption: caption,
        likes: likes
    };

    fetch(postUrl, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(postData => {
        console.log('Post created:', postData);

        // Now make the second request to link the post with an event
        const eventPostUrl = `${server}/event-posts`;
        const eventPostData = {
            event_id: eventId, // This is the event ID passed to the function
            post_id: postData.id // Assuming postData.id is the ID of the newly created post
        };

        return fetch(eventPostUrl, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventPostData)
        });
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(eventPostData => {
        console.log('Event post link created:', eventPostData);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
