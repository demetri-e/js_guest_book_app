//Event Registration App 
// Save names in a registration book. 

document.addEventListener('DOMContentLoaded', () => {
    //Variables
    const form = document.getElementById('registrar');
    const input = form.querySelector('input');

    const mainDiv = document.querySelector('.main');
    const ul = document.getElementById('invitedList');

    const div = document.createElement('div');
    const filterLabel = document.createElement('label');
    const filterCheckBox = document.createElement('input');


    //Create a div with a checkbox that hides unresponded guests
    filterLabel.textContent = "Hide those who haven't responded";
    filterCheckBox.type = 'checkbox';
    div.appendChild(filterLabel);
    div.appendChild(filterCheckBox);
    mainDiv.insertBefore(div, ul);
    filterCheckBox.addEventListener('change', (e) => {
        const isChecked = e.target.checked;
        const lis = ul.children;
        if (isChecked) {
            for (let i = 0; i < lis.length; i += 1) {
                let li = lis[i];
                if( li.className === 'responded') {
                    li.style.display = '';
                } else {
                    li.style.display = 'none';
                }
            }
        } else {
            for (let i = 0; i < lis.length; i += 1) {
                let li = lis[i];
                li.style.display = '';
            }
        }
    });


    //Create an Entry in the reservation book
    function createLI(text) {

        function createElement(elementName, property, value) {
            const element = document.createElement(elementName);
            element[property]= value;
            return element;
        }

        function appendToLI(elementName, property, value) {
            const element = createElement(elementName, property, value);
            li.appendChild(element);
        }
        //Create the <li> that holds the entry
        const li = document.createElement('li');

        appendToLI('span', 'textContent', text);

        //Create the label 
        const label = createElement('label', 'textContent', 'Confirmed');

        //Create the checkbox
        const checkbox = createElement('input', 'type', 'checkbox');

        //Append label and checkbox to <li>
        label.appendChild(checkbox);
        li.appendChild(label);

        //Create Edit Button
        appendToLI('button', 'textContent','edit');

        //Create Remove Button
        appendToLI('button', 'textContent', 'remove');

        return li;
    }

    //Grab the value from the input field and append the <li> to the document
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value;
        input.value = "";
        const li = createLI(text);
        ul.appendChild(li);  
    });

    //Checkbox Controls
    ul.addEventListener('change', (e) => {
        const checkbox = e.target;
        const checked = checkbox.checked;
        const listItem = checkbox.parentNode.parentNode;
        
        if (checked) {
            listItem.className = 'responded';
        } else {
            listItem.className = '';
        }
    });

    //Remove or edit a reservation entry
    ul.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON'){
            const button = e.target;
            const li = button.parentNode;
            const ul = li.parentNode;
            if (button.textContent === 'remove') {
                ul.removeChild(li);
            } else if (button.textContent === 'edit') {
            const span = li.firstElementChild;
            const input = document.createElement('input');
            input.type = 'text';
            input.value = span.textContent;
            li.insertBefore(input, span);
            li.removeChild(span);
            button.textContent = 'save';
            } else if (button.textContent === 'save') {
                const input = li.firstElementChild;
                const span = document.createElement('span');

                span.textContent = input.value;
                li.insertBefore(span, input);
                li.removeChild(input);
                button.textContent = 'edit';
            }
        }
    });

});