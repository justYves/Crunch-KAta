app.directive("item", function($compile) {
    return {
        restrict: "E",
        // replace: true,
        scope: {
            item: '=',
            key: '='
        },
        controller: "ItemController",
        templateUrl: "/pre-build/common/directive/item/item.html",
        link: function(scope, element, attrs) {
            if (angular.isArray(scope.item)) {
                // append the collection direcelement and render the directive
                // <a class='btn btn-default btn-block'></a>
                $compile(`
                    <a id='item' ng-click='isCollapsed = !isCollapsed'>
                        <i class='fa fa-plus' ng-show='isCollapsed'></i>
                        <i class='fa fa-minus'ng-show='!isCollapsed'></i>
                        {{key}}
                        <span class='badge pull-right'>{{getLength(item)}}</span>
                    </a>
                    <ul collapse='isCollapsed'>
                        <group order='item'></group>
                    </ul>
                    `)(scope, function(cloned, scope) {
                    element.replaceWith(cloned);
                });
            } else if(angular.isObject(scope.item)){
           $compile("<group order='item'></group>")(scope, function(cloned, scope) {
                    element.replaceWith(cloned);
                });
            } else {
                $compile("<a ng-click='setCurrentVar(item)'>{{getName(item)}}</a>")(scope, function(cloned, scope) {
                    element.replaceWith(cloned);
                });
            }
        }
    };
});
