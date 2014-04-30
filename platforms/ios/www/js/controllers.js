angular.module('starter.controllers', [])

.controller('DashCtrl', function ($scope, $http, $interval, $ionicPopup) {
	var counter = 0, clocktimer = 0, startTime = 0;

	$http.get('cards/hiragana.json').success( function(data) {
		$scope.cards = data;
	
		$scope.cards = shuffleCards($scope.cards);
		$scope.guessCard = randomCard($scope.cards);
		counter = $scope.cards.length;
		$scope.timer = "00:00";
	});

	$scope.startTimer = function() {
		startTime = new Date();
		clocktimer = $interval(updateTimer, 1000);
	}

	function updateTimer(){
		var now = moment(new Date()-startTime).format("mm:ss");
		$scope.timer = now;
	}

	$scope.stopTimer = function(){
		$interval.cancel(clocktimer);
	}

	$scope.pickCard = function(card) {
		if ($scope.guessCard == card.name) {
			console.log("after:"+$scope.timer);
			card.display = false;
			counter -= 1;
			if(counter > 1){
				$scope.guessCard = randomCard($scope.cards);
				$scope.cards = shuffleCards($scope.cards);
			}
			else {
				$scope.stopTimer();
				$ionicPopup.alert({
					title: 'Omedetou',
					template: 'Congratulations it took you <strong>'+$scope.timer+'</strong>  to complete the game!'
				});
				
			}
		}
	}

	function randomCard(cards){
		var picked = false, cardIndex, cardName;
		while (picked == false){
			cardIndex = Math.floor(Math.random()*cards.length);
			if(cards[cardIndex].display){
				cardName = cards[cardIndex].name;
				picked = true;
			}
		}
		
		return cardName;
	}

	function shuffleCards(cards){
		var currentIndex = cards.length, 
			temp, randomIndex;
		//debugger;
	  	while (0 !== currentIndex) {

		  	if(!cards[currentIndex-1].display){
		  		currentIndex -= 1;
		  		continue;
		  	}

		    do{
				randomIndex = Math.floor(Math.random() * currentIndex);
				if(cards[randomIndex].display)
					break;
		    } while(true)

		    currentIndex -= 1;
		    temp = cards[currentIndex];
		    cards[currentIndex] = cards[randomIndex];
		    cards[randomIndex] = temp;
	  	}

	  	return cards;
	}
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
});
