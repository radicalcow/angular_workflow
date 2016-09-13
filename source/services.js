/**
 * Restangular-based data service, fetches user data from the backend
 *
 * @see https://github.com/mgonto/restangular
 */
var services = angular.module('ExampleApp.services', [])
	.factory('UserdataService', ['Restangular', '$q', function UserdataService(Restangular, $q){
		return {
			getFirstUsername: function()
			{
				var firstUsernameDeferred = $q.defer();
				var response = Restangular.one('users').getList().then(function(response){
					firstUsernameDeferred.resolve(response[0].name);
				});
				return firstUsernameDeferred.promise;
			}
		};
	}]);