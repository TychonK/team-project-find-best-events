{{#each this}}
    <option class="options" data-code={{id}}>{{name}}</option>
{{/each}}

const  filters = document.querySelector('.filters'),
const select =  document.querySelector('.select-js'),