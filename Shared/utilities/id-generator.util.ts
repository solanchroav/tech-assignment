export function generateUniqueId(existingIds: number[]): number {
    let newId = 1;
    while (existingIds.includes(newId)) {
      newId++;
    }
    return newId;
}



