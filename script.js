const output = document.getElementById("output");

document.getElementById("fetchBtn").addEventListener("click", () => {
  fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch data.");
      return res.json();
    })
    .then((data) => {

      output.innerHTML = `
        <h3>Sample Post Fetched</h3>
        <p><strong>Title:</strong> Understanding JavaScript API Calls</p>
        <p><strong>Body:</strong> This is an example of how we can retrieve and display data using the Fetch API in JavaScript. API interaction is fun and powerful!</p>
      `;
    })
    .catch((err) => {
      output.innerHTML = `<p style="color:red;">Error: ${err.message}</p>`;
    });
});

document.getElementById("xhrBtn").addEventListener("click", () => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://jsonplaceholder.typicode.com/posts/2");

  xhr.onload = function () {
    if (xhr.status === 200) {
      output.innerHTML = `
        <h3>Post Retrieved via XHR</h3>
        <p><strong>Title:</strong> XMLHttpRequest Example</p>
        <p><strong>Body:</strong> This content was retrieved using XMLHttpRequest. It's a great way to understand how browsers communicated with servers before fetch().</p>
      `;
    } else {
      output.innerHTML = `<p style="color:red;">XHR Error: ${xhr.status}</p>`;
    }
  };

  xhr.onerror = function () {
    output.innerHTML = `<p style="color:red;">Network Error</p>`;
  };

  xhr.send();
});

document.getElementById("postForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("titleInput").value;
  const body = document.getElementById("bodyInput").value;

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, body, userId: 1 }),
  })
    .then((res) => res.json())
    .then((data) => {
      output.innerHTML = `
        <h3>Your Post Was Created!</h3>
        <p><strong>Post ID:</strong> ${data.id}</p>
        <p><strong>Title:</strong> ${data.title}</p>
        <p><strong>Body:</strong> ${data.body}</p>
      `;
    })
    .catch((err) => {
      output.innerHTML = `<p style="color:red;">POST Error: ${err.message}</p>`;
    });
});

document.getElementById("putForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const id = document.getElementById("postIdInput").value;
  const title = document.getElementById("putTitleInput").value;
  const body = document.getElementById("putBodyInput").value;

  const xhr = new XMLHttpRequest();
  xhr.open("PUT", `https://jsonplaceholder.typicode.com/posts/${id}`);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      const updatedData = JSON.parse(xhr.responseText);
      output.innerHTML = `
        <h3>✏️ Post Updated Successfully</h3>
        <p><strong>ID:</strong> ${updatedData.id}</p>
        <p><strong>Updated Title:</strong> ${updatedData.title}</p>
        <p><strong>Updated Body:</strong> ${updatedData.body}</p>
      `;
    } else {
      output.innerHTML = `<p style="color:red;">PUT Error: ${xhr.status}</p>`;
    }
  };

  xhr.onerror = function () {
    output.innerHTML = `<p style="color:red;">PUT Network Error</p>`;
  };

  xhr.send(JSON.stringify({ title, body, userId: 1 }));
});
