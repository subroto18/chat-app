export const REMOVE_USER = (userIds, storedUser) => {
  let users = [];

  userIds.forEach((userId) => {
    storedUser?.forEach((item) => {
      if (item.value === userId) {
        users.push(item);
      }
    });
  });
  return users;
};

export const ADD_USER = (userIDS, storedUser, options) => {
  let users = [];

  userIDS.forEach((userId) => {
    options?.forEach((item) => {
      if (item.value === userId) {
        // if user not present in array , then add to array

        let userPresent = users.findIndex((item) => item.value === userId);

        if (userPresent == -1) {
          users.push(item);
        }
      }
    });

    storedUser?.forEach((item) => {
      if (item.value === userId) {
        // if user not present in array , then add to array
        let userPresent = users.findIndex((item) => item.value === userId);

        if (userPresent == -1) {
          users.push(item);
        }
      }
    });
  });
  return users;
};
