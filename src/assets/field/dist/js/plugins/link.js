$(function() {

    $.extend($.FE.DEFAULTS, {
        craftLinkCriteria: false,
        craftLinkSources: [],
        craftLinkStorageKey: false,
        craftLinkElementType: false,
        craftLinkElementRefHandle: false,
        craftLinkElementSiteId: false
    });

    $.FE.DefineIcon('insertLinkEntry', { NAME: 'link' });
    $.FE.RegisterCommand('insertLinkEntry', {
        title: 'Insert Link',
        focus: true,
        refreshAfterCallback: true,
        callback: function (cmd, val) {
            var _editor = this,
                _selectedText = (this.selection.text() || false);

            // save selection before modal is shown
            this.selection.save();

            var modal = Craft.createElementSelectorModal(this.opts.craftLinkElementType, {
                storageKey: (this.opts.craftLinkStorageKey || 'FroalaInput.LinkTo.' + this.opts.craftLinkElementType),
                sources: this.opts.craftLinkSources,
                criteria: $.extend({ siteId: this.opts.craftLinkElementSiteId }, this.opts.craftLinkCriteria),
                onSelect: $.proxy(function(elements) {
                    if (elements.length) {
                        var element = elements[0],
                            url = element.url + '#' + this.opts.craftLinkElementRefHandle + ':' + element.id,
                            title = _selectedText.length > 0 ? _selectedText : element.label;

                        _editor.link.insert(url, title);

                        return true;
                    }
                }, this),
                closeOtherModals: false
            });
        }
    });

    $.FroalaEditor.RegisterCommand('linkEdit', {
        callback: function (cmd, val) {
            var $currentLink = this.link.get();

            var modal = Craft.createElementSelectorModal(this.opts.craftLinkElementType, {
                storageKey: (this.opts.craftLinkStorageKey || 'FroalaInput.LinkTo.' + this.opts.craftLinkElementType),
                sources: this.opts.craftLinkSources,
                criteria: $.extend({ siteId: this.opts.craftLinkElementSiteId }, this.opts.craftLinkCriteria),
                onSelect: $.proxy(function(elements) {
                    if (elements.length) {
                        var element = elements[0],
                            url = element.url + '#' + this.opts.craftLinkElementRefHandle + ':' + element.id;

                        $currentLink = $($currentLink);
                        $currentLink.attr('href', url);

                        return true;
                    }
                }, this),
                closeOtherModals: false
            });
        }
    });

});