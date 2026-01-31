const paginate = ({ page = 1, limit = 10 }) => {
    const p = Math.max(1, Number(page));
    const l = Math.min(50, Number(limit));
    return {
        skip: (p - 1) * l,
        limit: l,
        page: p
    };
};

export {
    paginate
}