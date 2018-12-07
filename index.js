const STORE = [
    {name: "apples", checked: false},
    {name: "oranges", checked: false},
    {name: "milk", checked: true},
    {name: "bread", checked: false}
  ];

  function generateItemElement(item, itemIndex, template){
      return `
      <li class="js-item-index-element" data-item-index="${itemIndex}">
        <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
        <div class="shopping-item-controls">
          <button class="shopping-item-toggle js-item-toggle">
              <span class="button-label">check</span>
          </button>
          <button class="shopping-item-delete js-item-delete">
              <span class="button-label">delete</span>
          </button>
        </div>
      </li>`;
  }

  function generateShoppingItemsString(shoppingList){

    const items = shoppingList.map((item,index) => generateItemElement(item,index));
    
    return items.join("");

  }
function renderShoppingList() {
    // this function will be responsible for rendering the shopping list in
    // the DOM

    const shoppingListItemString = generateShoppingItemsString(STORE)
    $('.js-shopping-list').html(shoppingListItemString);
    console.log();
  }

  function addItemToShoppingList(itemName){
      console.log(`Adding ${itemName} to shopping list`);
      STORE.push({name: itemName, checked: false});
  }
  
  
  function handleNewItemSubmit() {
    // this function will be responsible for when users add a new shopping list item
    
    $('#js-shopping-list-form').submit(function(event){
        event.preventDefault()
        const newItemName = $('.js-shopping-list-entry').val()
        console.log();
        $('.js-shopping-list-entry').val("")
        addItemToShoppingList(newItemName)
        renderShoppingList();

    })

  }
  
  function toggleCheckedForListItem(itemIndex) {
    console.log("Toggling checked property for item at index " + itemIndex);
    STORE[itemIndex].checked = !STORE[itemIndex].checked;
  }

  function getItemIndexFromElement(item){
      const itemIndexString = $(item).closest('.js-item-index-element').attr('data-item-index');

      return parseInt(itemIndexString,10);
  }
  
  function handleItemCheckClicked() {
    // this function will be responsible for when users click the "check" button on
    // a shopping list item.
    console.log();
    $('.js-shopping-list').on('click','.js-item-toggle',function(item){
        const itemIndex = getItemIndexFromElement(this);
        console.log(itemIndex);
        toggleCheckedForListItem(itemIndex);
        renderShoppingList();
    })
  }
  
  
  function deleteClickedForListItem(itemIndex){
    STORE.splice(itemIndex,1); 
  }
  function handleDeleteItemClicked() {
    // this function will be responsible for when users want to delete a shopping list
    // item
    console.log()

    $('.js-shopping-list').on('click','.js-item-delete',function(item){
        const itemIndex = getItemIndexFromElement(this);
        console.log(itemIndex);
        deleteClickedForListItem(itemIndex)
        renderShoppingList();
    })  
  }
  
  // this function will be our callback when the page loads. it's responsible for
  // initially rendering the shopping list, and activating our individual functions
  // that handle new item submission and user clicks on the "check" and "delete" buttons
  // for individual shopping list items.
  function handleShoppingList() {
    renderShoppingList();
    handleNewItemSubmit();
    handleItemCheckClicked();
    handleDeleteItemClicked();
  
  }
  
  // when the page loads, call `handleShoppingList`
  $(handleShoppingList);