import * as React from "react";
import Modal from 'react-responsive-modal';

interface IProps {
    currentCar: any
}

interface IState {
    open: boolean
}

export default class CarDetail extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props)   
        this.state = {
            open: false
        }
        this.updateCar = this.updateCar.bind(this)

    }

	public render() {
        const currentCar = this.props.currentCar
        const { open } = this.state;
		return (
			<div className="container car-wrapper">
                <div className="row car-heading">
                    <b>{currentCar.title}</b>&nbsp; ({currentCar.tags})
                </div>
                <div className="row car-date">
                    {currentCar.uploaded}
                </div>
                <div className="row car-img">
                    <img src={currentCar.url}/>
                </div>
                
                <div className="row car-done-button">
                    <div className="btn btn-primary btn-action" onClick={this.downloadCar.bind(this, currentCar.url)}>Download </div>
                    <div className="btn btn-primary btn-action" onClick={this.onOpenModal}>Edit </div>
                    <div className="btn btn-primary btn-action" onClick={this.deleteCar.bind(this, currentCar.id)}>Delete </div>
                </div>
                <Modal open={open} onClose={this.onCloseModal}>
                    <form>
                        <div className="form-group">
                            <label>Car Title</label>
                            <input type="text" className="form-control" id="Car-edit-title-input" placeholder="Enter Title"/>
                            <small className="form-text text-muted">You can edit any car later</small>
                        </div>
                        <div className="form-group">
                            <label>Tag</label>
                            <input type="text" className="form-control" id="Car-edit-tag-input" placeholder="Enter Tag"/>
                            <small className="form-text text-muted">Tag is used for search</small>
                        </div>
                        <button type="button" className="btn" onClick={this.updateCar}>Save</button>
                    </form>
                </Modal>
            </div>
		);
    }

    // Modal Open
    private onOpenModal = () => {
        this.setState({ open: true });
	  };
    
    // Modal Close
    private onCloseModal = () => {
		this.setState({ open: false });
    };

    // Open meme image in new tab
    private downloadCar(url: any) {
        window.open(url);
    }
    private deleteCar(id: any) {
        const url = "https://thecarapi.azurewebsites.net/api/CarItems/" + id
    
        fetch(url, {
            method: 'DELETE'
        })
        .then((response : any) => {
            if (!response.ok) {
                // Error Response
                alert(response.statusText)
            }
            else {
                location.reload()
            }
        })
    }
    private updateCar(){
        const titleInput = document.getElementById("car-edit-title-input") as HTMLInputElement
        const tagInput = document.getElementById("car-edit-tag-input") as HTMLInputElement
    
        if (titleInput === null || tagInput === null) {
            return;
        }
    
        const currentCar = this.props.currentCar
        const url = "http://themsacarapi.azurewebsites.net/api/CarItems/" + currentCar.id
        const updatedTitle = titleInput.value
        const updatedTag = tagInput.value
        fetch(url, {
            body: JSON.stringify({
                "height": currentCar.height,
                "id": currentCar.id,
                "tags": updatedTag,
                "title": updatedTitle,
                "uploaded": currentCar.uploaded,
                "width": currentCar.width,
                "Engine": currentCar.Engine,
                "Cylinders":currentCar.Cylinders
            }),
            
            headers: {'cache-control': 'no-cache','Content-Type': 'application/json'},
            method: 'PUT'
        })
        .then((response : any) => {
            if (!response.ok) {
                // Error State
                alert(response.statusText + " " + url)
            } else {
                location.reload()
            }
        })
    }
   
}