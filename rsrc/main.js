class Slideshow {
	constructor(node) {
		let prev, next, time;

		this.autostop = false;
		this.timeout = false;
		this.current = 0;
		this.list = node.getElementsByTagName("ul")[0].getElementsByTagName("li");

		if(prev = node.getElementsByClassName("prev")[0]) {
			prev.onclick = () => {
				this.initializeTimeout();
				this.changeDirection("prev")
			};
		}

		if(next = node.getElementsByClassName("next")[0]) {
			next.onclick = () => {
				this.initializeTimeout();
				this.changeDirection("next");
			};
		}

		if(time = node.getAttribute("data-time")) {
			setInterval(() => {
				!this.autostop && this.changeDirection("next");
			}, time);
		}
	}

	initializeTimeout() {
		if(this.timeout) {
			clearTimeout(this.timeout);
		}

		this.autostop = true;
		this.timeout = setTimeout(() => {
			this.autostop = false;
		}, 15000);
	}

	changeDirection(direction) {
		(direction === "prev" && --this.current);
		(direction === "next" && ++this.current);

		if(this.list[this.current] === undefined) {
			switch(direction) {
				case "prev": this.current = this.list.length - 1; break;
				case "next": this.current = 0;
			}
		}

		for(let i = 0; i < this.list.length; ++i) {
			if(this.current === i) {
				this.list[i].getAttribute("class") !== "show" && this.list[i].setAttribute("class", "show " + direction);
			} else {
				this.list[i].getAttribute("class") !== "hide" && this.list[i].setAttribute("class", "hide");
			}
		}
	}
}