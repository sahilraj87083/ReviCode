export const getPrivateRoom = (a, b) => {
    return `private:${[a.toString(), b.toString()].sort().join(":")}`
}