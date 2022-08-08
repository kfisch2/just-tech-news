async function saveFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value.trim();

  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  if (title) {
    // console.log(title);
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector('.save-post-btn')
  .addEventListener('click', saveFormHandler);
