angular.module('starter.controllers', [])

.controller('DashCtrl', function ($scope, $http, $interval, $ionicPopup) {
	var counter = 0, clocktimer = 0, startTime = 0;

	$http.get('cards/hiragana.json').success( function(data) {
		$scope.cards = data;
	
		$scope.cards = shuffleCards($scope.cards);
		counter = $scope.cards.length;
		$scope.timer = "00:00";
	});

	$scope.startTimer = function() {
		startTime = new Date();
		clocktimer = $interval(updateTimer, 1000);
		$scope.guessCard = randomCard($scope.cards);
		$scope.flipCards();
	}

	function updateTimer(){
		var now = moment(new Date()-startTime).format("mm:ss");
		$scope.timer = now;
	}

	$scope.stopTimer = function(){
		$interval.cancel(clocktimer);
	}

	$scope.flipCards = function () {
		for(var i = 0; i < $scope.cards.length; i++){
			//console.log("before flipped? "+$scope.cards[i].flipped);
			$scope.cards[i].flipped = !$scope.cards[i].flipped;//true;
			//console.log("flipped? "+$scope.cards[i].flipped);
		}
	}

	$scope.isFlipped = function(flipped){
		//console.log("flipped? "+flipped);
		return flipped ? "hover_effect" : "";
		//return flipped ? "test" : "";
	}

	$scope.pickCard = function(card) {
		console.log("flipped? "+card.flipped)
		if ($scope.guessCard == card.name) {
			card.played = true;
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
			if(!cards[cardIndex].played){
				cardName = cards[cardIndex].name;
				picked = true;
			}
		}
		
		return cardName;
	}

	function shuffleCards(cards){
		var currentIndex = cards.length, 
			temp, randomIndex;

	  	while (0 !== currentIndex) {

		  	if(cards[currentIndex-1].played){
		  		currentIndex -= 1;
		  		continue;
		  	}

		    do{
				randomIndex = Math.floor(Math.random() * currentIndex);
				if(!cards[randomIndex].played)
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
