﻿define(
	['app',
		'common',
		'codemirror',
		'text!webapp/scripts/script-editor.tpl'
	],
	function (application, commonModule, codemirror, editorTemplate) {
	//
		application.module('Scripts.Editor', function (module, app, backbone, marionette, $, _) {

			module.ScriptEditorView = commonModule.FormView.extend({
				template: _.template(editorTemplate),
				onShow: function () {

					var textarea = this.$('.js-script-body')[0];
					
					this.cm = codemirror.fromTextArea(textarea, {
						mode: 'javascript',
						theme: 'bootstrap',
						lineNumbers: true,
						styleActiveLine: true,
						matchBrackets: true
					});
				},
				events: {
					'click .js-btn-save': 'btnSaveClick',
					'click .js-btn-cancel': 'btnCancelClick'
				},
				btnSaveClick: function (e) {
					e.preventDefault();

					this.cm.save();
					var data = Backbone.Syphon.serialize(this);
					this.trigger('scripts:editor:save', data);
				},
				btnCancelClick: function (e) {
					e.preventDefault();
					this.trigger('scripts:editor:cancel');
				}
			});
		});

		return application.Scripts.Editor;
	});