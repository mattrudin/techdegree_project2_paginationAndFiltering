/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

// List of all students
const studentNodeList = document.querySelectorAll('li');
const pageContainer = document.querySelector('.page');

// Constant for number of items per page (can be changed dynamically)
const ITEMS_PER_PAGE = 10;


/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/

const showPage = (pageNumber) => {
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

const calculateStartIndex = pageNumber => Number(pageNumber + 0) - ITEMS_PER_PAGE;

const onInitialization = () => {
   const activeButton = document.querySelector('a[class="active"');
   const pageNumber = activeButton.innerText;
   showPage(pageNumber);
}


/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/
const appendPageLinks = () => {
   const divContainer = createElementWithClass('div', 'pagination')
   const ulContainer = document.createElement('ul');
   const numOfPages = calculatePageNumbers(studentNodeList, ITEMS_PER_PAGE);

   for(let i = 1; i <= numOfPages; i++) {
      createAndAppend('li', 'a', i, '#', ulContainer)   
   }

   divContainer.appendChild(ulContainer);
   return divContainer;
}

// The following function returns the number of pages. numPerPage is dynamic and can be changed according requirements
const calculatePageNumbers = (nodeList, numPerPage) => Math.ceil(nodeList.length / numPerPage);

// The following function will create two elements, add a given text and href to the second element, and append the elements as childs to a third element
const createAndAppend = (firstElement, secondElement, secondTextContent, secondHRef, appendToElemend) => {
   const first = document.createElement(firstElement);
   const second = document.createElement(secondElement);
   second.innerText = secondTextContent;
   second.href = secondHRef;
   // The following line sets the page-button at initiation active, if the number is 1
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

// Remember to delete the comments that came with this file, and replace them with your own code comments.
const pagination = appendPageLinks();
pagination.addEventListener('click', event => {
   const anchorList = document.querySelectorAll('a[href="#"]');
   for(let i = 0; i < anchorList.length; i++) {
      anchorList[i].className = '';
   }
   const button = event.target;
   button.className = 'active'
   const pageNumber = button.innerText;
   showPage(pageNumber);
})
pageContainer.appendChild(pagination);
onInitialization();