/**
* plopfile.js
* - contains the plop generators
*/

const isEmpty = (name) => {
  return (value) => {
    if (typeof value === 'undefined' || value === null || value === "") {
      return name + " is required";
    } else {
      return true;
    }
  }
}

module.exports = (plop) => {

//================ Mobx-domain-store ==================================//
  plop.setGenerator("Mobx-domain-store", {
    description: "Create a new mobx domain store",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your domain store name?",
        validate: isEmpty("name")
      }
    ],
    actions: [
      {
        type: "add",
        path: "app/stores/{{ properCase name }}Store.js",
        templateFile: "plop-templates/DefaultStore.js"
      },
      {
				type: 'modify',
				path: 'app/state/injectState.js',
				pattern: /(\/\* plop will append stores here \*\/)/gi,
				template: '$1,\r\n\t{{ name }}Store: new {{ properCase name }}Store(state.{{ properCase name }}Store)'
			},
      {
				type: 'modify',
				path: 'app/state/injectState.js',
				pattern: /(\/\* plop will append store imports here \*\/)/gi,
				template: "$1\r\nimport {{ properCase name }}Store from '../stores/{{ properCase name }}Store';"
			}
    ]
  });

//================ Mobx-model-store ==================================//
  plop.setGenerator("Mobx-model-store", {
    description: "Create a new mobx model store",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your model store name?",
        validate: isEmpty("name")
      }
    ],
    actions: [
      {
        type: "add",
        path: "app/stores/{{properCase name}}Store/{{properCase name}}ModelStore.js",
        templateFile: "plop-templates/DefaultModelStore.js"
      }
    ]
  });

//================ React-route ==================================//
  plop.setGenerator("React-route", {
    description: "Create a new route and container",
    prompts: [
      {
        type: "input",
        name: "routePath",
        message: "What is your route path? e.g /fundtransfer ",
        validate: isEmpty("routePath")
      },
      {
        type: "input",
        name: "routeContainer",
        message: "What is the name of the route container? ",
        validate: isEmpty("routeContainer")
      }
    ],
    actions: [
      {
        type: "add",
        path: "app/containers/{{ properCase routeContainer }}CTR/{{ properCase routeContainer }}CTR.js",
        templateFile: "plop-templates/DefaultCTR.js"
      },
      {
				type: 'modify',
				path: 'app/routes.js',
				pattern: /(\/\* plop will append container imports here \*\/)/gi,
				template: "$1\r\nimport {{ properCase routeContainer }}CTR from './containers/{{ properCase routeContainer }}CTR/{{ properCase routeContainer }}CTR';"
			},
      {
				type: 'modify',
				path: 'app/routes.js',
				pattern: /({\/\* plop will append routes here \*\/})/gi,
				template: "$1\r\n\t\t<Route path={path + \"{{ routePath }}\"} component={ {{ properCase routeContainer }}CTR } />"
			}
    ]
  });

//================ React-component ==================================//
  plop.setGenerator("React-component", {
    description: "Create a new react component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of the react component? ",
        validate: isEmpty("name")
      },
      {
				type: 'checkbox',
				name: 'baseComponentImports',
				message: 'Choose f4 base component imports:',
				choices: [
          { name: 'asF4Form'},
          { name: 'asF4FormElement'},
          { name: 'F4AccordionMenu'},
          { name: 'F4AddEditView'},
          { name: 'F4BackgroundImage'},
          { name: 'F4BranchLocator'},
          { name: 'F4Button'},
          { name: 'F4Card'},
          { name: 'F4CreditCardDisplay'},
          { name: 'F4DataTable'},
          { name: 'F4DataTableAbstractColumn'},
          { name: 'F4DataTableAbstractColumnAction'},
          { name: 'F4DataTableHeaderColumn'},
          { name: 'F4DataTableHeaderLinkColumn'},
          { name: 'F4Drawer'},
          { name: 'F4DrawerHeader'},
          { name: 'F4ErrorListFeedback'},
          { name: 'F4Feedback'},
          { name: 'F4Footer'},
          { name: 'F4FormElementWrapper'},
          { name: 'F4FormSeparator'},
          { name: 'F4FormWrapper'},
          { name: 'F4FullCalendarWidget'},
          { name: 'F4GreeterPanel'},
          { name: 'F4InputBooleanCheckbox'},
          { name: 'F4InputBooleanIconCheckbox'},
          { name: 'F4InputCheckbox'},
          { name: 'F4InputCheckboxes'},
          { name: 'F4InputDatePicker'},
          { name: 'F4InputDayOfMonthPicker'},
          { name: 'F4InputField'},
          { name: 'F4InputFileDrop'},
          { name: 'F4InputFileUpload'},
          { name: 'F4InputGridList'},
          { name: 'F4InputIconCheckbox'},
          { name: 'F4InputIconRadio'},
          { name: 'F4InputList'},
          { name: 'F4InputMonthYearPicker'},
          { name: 'F4InputRadio'},
          { name: 'F4InputSelect'},
          { name: 'F4InputSelector'},
          { name: 'F4InputSignaturePad'},
          { name: 'F4LetterAvatar'},
          { name: 'F4Modal'},
          { name: 'F4MultiStepForm'},
          { name: 'F4Navbar'},
          { name: 'F4NavbarActionElement'},
          { name: 'F4ProgressBar'},
          { name: 'F4RadialPicker'},
          { name: 'F4SearchView'},
          { name: 'F4Select'},
          { name: 'F4Spinner'},
          { name: 'F4StackMenu'},
          { name: 'F4StaticText'},
          { name: 'F4TextArea'},
          { name: 'F4ToggleSwitch'},
          { name: 'F4Toolbar'},
          { name: 'F4ToolbarElement'},
          { name: 'F4VisibilityWrapper'}
				]
			}
    ],
    actions: [
      {
        type: "add",
        path: "app/components/{{ properCase name }}/{{ properCase name }}.js",
        templateFile: "plop-templates/DefaultReactComponent.js"
      }
    ]
  });

//================ Server-middleware ==================================//
  plop.setGenerator("Server-middleware", {
    description: "Create a new server middleware",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your middleware name?",
        validate: isEmpty("name")
      }
    ],
    actions: [
      {
        type: "add",
        path: "app/middlewares/{{ properCase name }}Middleware.js",
        templateFile: "plop-templates/DefaultServerMiddleware.js"
      }
    ]
  });

};
