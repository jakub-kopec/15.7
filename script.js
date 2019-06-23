class Stopwatch extends React.Component {
    constructor(props) {
        super(props)
        this.state = ({
            running: false,
            resultList: [],
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        })
    }

    reset() {
        this.setState({
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        })
    }

	format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`
	}

	start() {
	    if (!this.state.running) {
	        this.setState({
                running: true
            })
	        this.watch = setInterval(() => this.step(), 10)
	    }
	}

	step() {
	    if (!this.state.running) return
	    this.calculate()
	}

	calculate() {
    let {minutes, seconds, miliseconds} = this.state.times
        if (this.times.miliseconds >= 100) {
            this.times.seconds += 1
            this.times.miliseconds = 0
        }
        if (this.times.seconds >= 60) {
            this.times.minutes += 1
            this.times.seconds = 0
        }
        this.setState({
            times: {
                minutes: minutes,
                seconds: seconds,
                miliseconds: miliseconds
            }
        })
	}

	stop() {
	    this.setState({
            running: false
        })
	    clearInterval(this.watch)
	}

	resetTimer() {
		this.stop()
		this.reset()
	}

	addToList() {
        let timeRecord = this.format(this.state.times)
        this.resultList = [...this.state.resultList, {'time': timeRecord, 'id': new Date().getTime()}]
        this.setState({
            resultList
        })
    }

    clearList() {
        this.setState({
            resultList: []
        })
    }

    pad0(value) {
        let result = value.toString()
        if (result.length < 2) {
            result = '0' + result
        }
        return result
    }

    render() {
        return (
            <div className='container'>
                <nav className='controls'>
                    <a href='#' className='button start' onClick={this.start.bind(this)}>Start</a>
                    <a href='#' className='button stop' onClick={this.stop.bind(this)}>Stop</a>
                    <a href='#' className='button reset' onClick={this.resetTimer.bind(this)}>Reset</a>
                    <a href='#' className='button add' onClick={this.addToList.bind(this)}>Add to list</a>
                    <a href='#' className='button clear' onClick={this.clearList.bind(this)}>Clear list</a>
                </nav>
                <div className='stopwatch'>{this.format(this.state.times)}</div>
                <ul className="results">
                    {this.state.resultList.map(itemList => <li key={itemList.id}>{itemList.time}</li>)}
                </ul>
            </div>
        )
    }
}


const app = document.getElementById('app')
ReactDOM.render(<Stopwatch/>, app)
