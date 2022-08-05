function shuffle(items: unknown[], iterations: number) {
    const result = [...items];
    const count = result.length;
    while (iterations-- > 0) {
        for (let i = 0; i < count; i++) {
            const target = Math.trunc(Math.random() * i);
            const item = result[target];
            result[target] = result[i];
            result[i] = item;
        }
    }

    return result;
}

const ArrayTools = {
    shuffle: shuffle
};

export default ArrayTools;