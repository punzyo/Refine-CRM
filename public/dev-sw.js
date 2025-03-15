self.addEventListener("push", (event) => {
  let data = { title: "新通知", body: "你收到了一條推播" };

  if (event.data) {
      try {
          data = event.data.json();
      } catch (e) {
          data.body = event.data.text();
      }
  }

  event.waitUntil(
      self.registration.showNotification(data.title, {
          body: data.body,
          icon: "/icon-192.png",
          requireInteraction: true,
      })
  );
});
