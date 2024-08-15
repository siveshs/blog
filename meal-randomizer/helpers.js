function randomElement(arr) {
    if (!Array.isArray(arr)) {
        console.error('ERROR: argument to randomElement(arr) is not an array');
        return;
    }
    let randomIndex = Math.floor(arr.length * Math.random());
    return arr[randomIndex];
}
