Template.layout.helpers({
	pageTitle: function(){ return Session.get('pageTitle')}
});
Session.setDefault("pageTitle","PageTitle");