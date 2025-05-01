export default function mapOrder(originalArray, orderArray, key) {
  if (!originalArray || !orderArray || !key) return []

  const clonedArray = [...originalArray]
  const orderedArray = clonedArray.sort((a, b) => {
    return orderArray.indexOf(a[key]) - orderArray.indexOf(b[key])
  })

  return orderedArray
}

export const generate_placeholder_card = column => {
  return {
    _id: 'placeholder_card',
    boardId: column.boardId,
    columnId: column._id,
    title: 'placeholder card',
    hidden: true
  }
}
