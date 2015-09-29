app.directive("item", function($compile) {
    return {
        restrict: "E",
        // replace: true,
        scope: {
            item: '=',
            key: '='
        },
        controller: "ItemController",
        // templateUrl: "/pre-build/common/directive/item/item.html",
        link: function(scope, element, attrs) {

            // check
            // if this member has children
            console.log(scope.item);
            if (angular.isArray(scope.item)) {
                // append the collection direcelement and render the directive
                // <a class='btn btn-default btn-block'></a>
                $compile("<a id='item'>{{key}} <span class='badge pull-right'>1,118</span></a>  <ul><group order='item'></group></ul>")(scope, function(cloned, scope) {
                    element.replaceWith(cloned);
                });
            } else if(angular.isObject(scope.item)){
           $compile("<group order='item'></group>")(scope, function(cloned, scope) {
                    element.replaceWith(cloned);
                });
            } else {
                $compile("<a>{{getName(item)}}</a>")(scope, function(cloned, scope) {
                    element.replaceWith(cloned);
                });
            }
        }
    };
});
