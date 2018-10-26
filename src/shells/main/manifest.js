const startTime = new Date().getTime();

export default app => (
  Promise.resolve()
    .then(() => app.datasource.getData())
    .then((data) => {
      const currentTime = new Date().getTime();
      const diffTime = currentTime - startTime;
      const waitTime = 2000 - diffTime;

      setTimeout(() => (
        app.mountContainer('main', {
          type: 'INIT',
          data,
        })
      ), waitTime || 0);
    })
    .catch((err) => {
      console.log(err);
    })
);
