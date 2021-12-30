export const sortByCreatedAtDateAscending = (arrayToSort: any[]) =>
  arrayToSort.sort((n1, n2) => {
    if (n1.createdAt > n2.createdAt) {
      return -1;
    }

    if (n1.createdAt < n2.createdAt) {
      return 1;
    }

    return 0;
  });
