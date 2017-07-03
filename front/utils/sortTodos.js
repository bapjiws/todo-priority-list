// Inspired by: https://stackoverflow.com/a/3464960/4134960

export const findInsertionPoint = (sortedArr, val, comparator) => {
    let low = 0;
    let high = sortedArr.length;
    let mid = -1;
    let c = 0;

    while(low < high)   {
        mid = parseInt((low + high)/2);
        c = comparator(sortedArr[mid], val);
        if(c < 0)   {
            low = mid + 1;
        }else if(c > 0) {
            high = mid;
        }else {
            return mid;
        }
    }
    return low;
};

export const todoComparator = (todo1, todo2) =>  todo2.priority - todo1.priority;