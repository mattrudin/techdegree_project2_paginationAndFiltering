/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

/************************************************************************************
Global variables / constants
************************************************************************************/
// List of all students
const studentNodeList = document.querySelectorAll('li');
const pageContainer = document.querySelector('.page');

// Constant for number of items per page
// Naming convention comes from the Java programming language
const ITEMS_PER_PAGE = 10;


/************************************************************************************
showPage function
************************************************************************************/
// The bellow function is a primary function and sets the number of item per page
const showPage = () => {
   const activeButton = document.querySelector('a[class="active"');
   const pageNumber = activeButton.innerText;
   showPageWithItems(pageNumber);
}

// The bellow function displays only the current active items
const showPageWithItems = pageNumber => {
   const startIndex = calculateStartIndex(pageNumber);
   const endIndex = startIndex + ITEMS_PER_PAGE;
   for(let i = 0; i < studentNodeList.length; i++) {
      if (i >= startIndex && i < endIndex) {
         studentNodeList[i].style.display = '';
      } else {
         studentNodeList[i].style.display = 'none';
      }
   }
}

// The following function calculates the startindex
const calculateStartIndex = pageNumber => Number(pageNumber + 0) - ITEMS_PER_PAGE;



/************************************************************************************
appendPageLinks function
************************************************************************************/
// The following function is a primary function. Its taks is to create and append the pagination element
const appendPageLinks = () => {
   const pagination = createPagination();
   pageContainer.appendChild(pagination);
}

// The bellow function creates the pagination element and adds functionality to it
const createPagination = () => {
   const divContainer = createElementWithClass('div', 'pagination')
   const ulContainer = document.createElement('ul');
   const numOfPages = calculatePageNumbers(studentNodeList, ITEMS_PER_PAGE);
   for(let i = 1; i <= numOfPages; i++) {
      createAndAppend('li', 'a', i, '#', ulContainer)   
   }
   divContainer.appendChild(ulContainer);
   divContainer.addEventListener('click', event => {
      const anchorList = document.querySelectorAll('a[href="#"]');
      for(let i = 0; i < anchorList.length; i++) {
         anchorList[i].className = '';
      }
      const button = event.target;
      button.className = 'active'
      const pageNumber = button.innerText;
      showPageWithItems(pageNumber);
   })
   return divContainer;
}


// The following function returns the number of pages
const calculatePageNumbers = (nodeList, numPerPage) => Math.ceil(nodeList.length / numPerPage);

// The following function will create two elements, add a given text and href to the second element, and append the elements as childs to a third element
const createAndAppend = (firstElement, secondElement, secondTextContent, secondHRef, appendToElemend) => {
   const first = document.createElement(firstElement);
   const second = document.createElement(secondElement);
   second.innerText = secondTextContent;
   second.href = secondHRef;
   // The following line sets the page-button at initialization active, if the page number is 1 (at the first load of the page)
   if(secondTextContent === 1) second.className ='active';
   first.appendChild(second);
   appendToElemend.appendChild(first); 
}

// The following function creates a given element with a className
const createElementWithClass = (elementName, className) => {
   const element = document.createElement(elementName);
   element.className = className;
   return element;
}


/************************************************************************************
Invokation of both primary functions
************************************************************************************/
appendPageLinks();
showPage();