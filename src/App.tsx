import * as React from 'react';
import Modal from 'react-responsive-modal';
import './App.css';
import CarDetail from './components/CarDetail';
import CarList from './components/CarList';
import PatrickLogo from './patrick-logo.png';




interface IState {
	currentCar: any,
	cars: any[],
	open: boolean,
	uploadFileList: any,
}

class App extends React.Component<{}, IState> {
	constructor(props: any) {
        super(props)
        this.state = {
			currentCar: {"id":0, "title":"Loading ","url":"","tags":"Cars","":"","width":"0","height":"0","Engine":"cc","Cylinder":"0",},
			cars: [],
			open: false,
			uploadFileList: null
		}     	
		this.selectNewCar = this.selectNewCar.bind(this)
		this.fetchCars = this.fetchCars.bind(this)
		this.fetchCars("")
		this.handleFileUpload = this.handleFileUpload.bind(this)
		this.uploadCar = this.uploadCar.bind(this)


this.fetchCars("")	
	}

	public render() {
		const { open } = this.state;
		return (
		<div>
			<div className="header-wrapper">
				<div className="container header">
					<img src={PatrickLogo} height='40'/>&nbsp; JDM Garage &nbsp;
					<div className="btn btn-primary btn-action btn-add" onClick={this.onOpenModal}>Add </div>
				</div>
			</div>
			<div className="container">
				<div className="row">
					<div className="col-7">
						<CarDetail currentCar={this.state.currentCar} />
					</div>
					<div className="col-5">
						<CarList Cars={this.state.cars} selectNewCar={this.selectNewCar} searchByTag={this.fetchCars}/>
					</div>
				</div>
			</div>
			<Modal open={open} onClose={this.onCloseModal}>
				<form>
					<div className="form-group">
						<label>Car Title</label>
						<input type="file" onChange={this.handleFileUpload} className="form-control-file" id="car-image-input" />
						<small className="form-text text-muted">You can edit any car later</small>
					</div>
					<div className="form-group">
						<label>Tag</label>
						<input type="text" className="form-control" id="car-tag-input" placeholder="Enter Tag" />
						<small className="form-text text-muted">Tag is used for search</small>
					</div>
					<div className="form-group">
						<label>Image</label>
						<CarList Cars={this.state.cars} selectNewCar={this.selectNewCar} searchByTag={this.fetchCars}/>
					</div>

					<button type="button" className="btn" onClick={this.uploadCar}>Upload</button>
				</form>
			</Modal>
		</div>
		);
	}


	// Modal open
	private onOpenModal = () => {
		this.setState({ open: true });
	  };
	
	// Modal close
	private onCloseModal = () => {
		this.setState({ open: false });
	};
	
	// Change selected meme
	private selectNewCar(newCar: any) {
		this.setState({
			currentCar: newCar
		})
	}
	private fetchCars(tag: any) {
		
		let url = "https://redo-msacarapi.azurewebsites.net/api/CarItems"
		if (tag !== "") {
			url += "/tag?=" + tag
			
		}
		
		fetch(url, {
			method: 'GET'
		})
		.then(res => res.json())
		.then(json => {
			let currentCar = json[0]
			if (currentCar === undefined) {
				currentCar = {"id":0, "title":"tag","uploaded":"","width":"0","height":"0"}
			}
			this.setState({
				currentCar,
				cars: json
			})
		});
	}
	private handleFileUpload(fileList: any) {
		this.setState({
			uploadFileList: fileList.target.files
		})
	}
	private uploadCar() {
		const titleInput = document.getElementById("car-title-input") as HTMLInputElement
		const tagInput = document.getElementById("car-tag-input") as HTMLInputElement
		const imageFile = this.state.uploadFileList[0]
	
		if (titleInput === null || tagInput === null || imageFile === null) {
			return;
		}
	
		const title = titleInput.value
		const tag = tagInput.value
		const url = "https://redo-msacarapi.azurewebsites.net/api/CarItems/upload"
	
		const formData = new FormData()
		formData.append("Title", title)
		formData.append("Tags", tag)
		formData.append("image", imageFile)
	
		fetch(url, {
			body: formData,
			headers: {'cache-control': 'no-cache'},
			method: 'POST'
		})
		.then((response : any) => {
			if (!response.ok) {
				// Error State
				alert(response.statusText)
			} else {
				location.reload()
			}
		})
	}
}

export default App;
