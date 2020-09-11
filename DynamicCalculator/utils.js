

let total_value = 0


function get_element_li (name, price) {
  return `<li class="added-item">name: ${name} price: ${price}  <button class="remove-item">remove</button></li>`
}

let add_item_to_list_with_template = (template_function) => {
  return (event) => {
    /*
      add the item to the list
      add event listener to the button inside the element just added with the remove_item function
      add the value to the total
    */
  }
}

let removeButtonClicked = (event) => {
  let removeButton = event.target
  let listItem = removeButton.parentNode
  let list = listItem.parentNode

  price = getPrice(listItem.innerHTML)
  total_value -= price
  updateTotalUi()

  list.removeChild(listItem)

}

let getPrice = (text) => {
  let splits = text.split("Price: ")
  let priceSplit = splits[1]
  let priceSections = priceSplit.split("&nbsp")
  let priceString = priceSections[0]
  let price = parseFloat(priceString)

  return price
}

let createListItem = (name, price) => {
  let listItem = document.createElement("li")
  let button = document.createElement("button")  

  button.appendChild(document.createTextNode("Remove"))
  button.addEventListener("click", removeButtonClicked)


  listItem.appendChild(document.createTextNode("Item: " + name + "\u00A0\u00A0Price: " + price.toString() + "\u00A0\u00A0\u00A0"))
  listItem.appendChild(button)
  

  total_value += price
  
  updateTotalUi()
  
  return listItem
}

let updateTotalUi = () => {
  let totalLabel = document.getElementById("total")
  totalLabel.innerHTML = total_value.toString()
}

let add_button_clicked = () => {
  let itemNameTextInput = document.getElementById("item-name")
  let itemValueTextInput = document.getElementById("item-value")
  let unorderdList = document.getElementById("items")
  let items = unorderdList.getElementsByTagName("li")


  let itemName = itemNameTextInput.value.trim()
  let itemValue = itemValueTextInput.value.trim()

  if (isNaN(itemValue)) {
    error_container()
  } else if (itemName === "" || itemValue === "") {

  } else {
    ok_container()
    let value = parseFloat(itemValue)
    let listItem = createListItem(itemName, value)
    unorderdList.appendChild(listItem)
  }
}

let error_container = () => {
  let container = document.getElementById("content-container")
  container.classList.add("red-border")
}

let ok_container = () => {
  let container = document.getElementById("content-container")
  container.classList.remove("red-border")
}
/*
 for removing elements could be this way
  let element_to_delete = document.querySelector("selector").lastElementChild;
  element_to_delete.parentNode.removeChild(element_to_delete);
  or we could use ChildNode.remove()
  https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove
*/

let remove_item  = (node_to_remove) => {

}