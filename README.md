# Ember-dialogue

> Use the new [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) element to create accessible, HTML5-first dialogs

(misspelled on purpose)

[You probably shouldn't use modals](http://uxmovement.com/mobile/why-you-should-avoid-using-modal-windows-on-mobile/), but for times where an error occurs, and needs immediate attention, accessible solutions can vary in mileage.  Often times, we append `role="alert"` or `role="alertdialog"`, but this only solves the first of problems.  Other problems often include:

* Refocusing the previously-interacted-with element which **caused** the modal in the first place when the modal is dismissed.
* Preventing interaction with all elements in the `<body>` besides the modal itself
* Dismissing the modal when the foreground of the application is clicked/tapped
* Focusing the modal content when it appears

`ember-dialogue` does all this out-of-the-box, with little effort, using the new HTML5 [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) element.

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Usage

Simply use the `{{alert-message}}` component.

Note: for optimal accessibility, **you *should always* specify a `title`, and `description`**.

The component can be used in both block form (`{{#alert-message}}[content here]{{/alert-message}}`), or non-block form (`{{alert-message}}`); if you use the former and provide a `title` or `description`, they will appear inside the `<dialog>` element.  Otherwise, it's your responsibility to provide content in block form for the `<dialog>`.

### Basic Usage

```
{{alert-message title="Authentication Failed" description="We could not match your username and password with an existing user."}}
```

### Customized Dismiss Button

Via the `dismissText` property:
```
{{alert-message dismissText="OK, I Understand" title="Session Timeout" description="You have been idle for over 25 minutes, and your session has timed out.  Please re-authenticate"}}
```

### Customized Dismiss Action

Use closure actions:
```
{{alert-message onDismiss=(action "checkLogin") title="" description=""}}
```

### Customized Template

Override the component's template by adding `alert-message.hbs` to `app/templates/components/`, and customize to your liking.

#### Using `<form>`s within blocks

Placing a `<form>` wthin a `<dialog>` element [is actually a best-practice](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog#Example_2).  Using this technique, alongside HTML5 `autofocus`, we can allow the `<form>` to naturally gain focus:

```
{{#alert-message title="Please Re-authenticate" description="You must re-validate your session, as a time-out has occurred"}}
	<form method="dialog">
		<label for="email">Email</label>
		{{input type="email" value=userEmail required=true autofocus=true id="email"}}
		<label for="password">Password</label>
		{{input type="password" id="password" value=userPassword required=true}}
		<footer>
			<button type="submit">Re-Authenticate</button>
		</footer>
	</form>
{{/alert-message}}
```

Notice the attribute on the `<form>`, where we set `method="dialog"`; this prevents the form from submitting, and dismisses the dialog once the form validates.
## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
