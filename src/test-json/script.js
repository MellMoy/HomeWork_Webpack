fetch('http://localhost:3000/posts')
  .then(response => response.json())
  .then(data => {
    const postsList = document.getElementById('posts');
    data.forEach(post => {
      const postElement = document.createElement('li');
      postElement.textContent = `${post.title} - ${post.content}`;
      postsList.appendChild(postElement);
    });
  });