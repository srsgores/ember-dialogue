import {moduleForComponent, test} from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

const DISMISS_SELECTOR = ".dialog-dismiss";

moduleForComponent("alert-message", "Integration | Component | alert message", {
	integration: true
});

test("it renders", function(assert) {
	this.set("sampleText", "template block text");
	this.render(hbs`{{alert-message dismissible=false}}`);

	assert.equal(this.$().text().trim(), "");

	// Template block usage:
	this.render(hbs`
		{{#alert-message dismissible=false}}
			{{sampleText}}
		{{/alert-message}}
	`);

	assert.equal(this.$().text().trim(), this.get("sampleText"));
});

test("it is a `<dialog>` element", function(assert) {
	this.render(hbs`{{alert-message}}`);
	assert.equal(this.$("dialog:first").length, 1);
});

test("it has an `open` attribute by default", function(assert) {
	this.render(hbs`{{alert-message}}`);

	assert.ok(this.$("dialog:first").attr("open"));
});

test("it has a dismiss button when the user allows dismissal", function(assert) {
	this.render(hbs`{{alert-message}}`);

	assert.ok(this.$(DISMISS_SELECTOR).length > 0);
});

test("it doesn't have a dismiss button when the user disables dismissal", function(assert) {
	this.render(hbs`{{alert-message dismissible=false}}`);

	assert.equal(this.$(DISMISS_SELECTOR).length, 0);
});

test("it sets the close text when the user overrides it", function(assert) {
	this.set("dismissText", "Dismiss");

	this.render(hbs`{{alert-message dismissText=dismissText}}`);

	assert.equal(this.$(DISMISS_SELECTOR).text().trim(), this.get("dismissText"));
});

test("it dismisses when the user calls dismiss", function(assert) {
	assert.expect(2);
	this.render(hbs`{{alert-message}}`);

	let $component = this.$("dialog:first");
	assert.equal($component.is(":visible"), true, "Dialog is visible by default");
	this.$(DISMISS_SELECTOR).click();

	assert.equal(this.$("dialog:first").is(":visible"), false, "Dialog is hidden when dismiss button is clicked");
});

test("Binds `aria-describedby` and `aria-labelledby` attributes to title and description respectively", function(assert) {
	assert.expect(2);
	this.set("sampleTitle", "A sample title");
	this.set("sampleDescription", "A sample description");

	this.render(hbs`{{alert-message title=sampleTitle description=sampleDescription}}`);

	let $component = this.$("dialog:first");
	assert.equal($component.attr("aria-describedby"), this.get("sampleDescription"), "Has proper description");
	assert.equal($component.attr("aria-labelledby"), this.get("sampleTitle"), "Has proper label");
});
