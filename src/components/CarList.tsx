import * as React from "react";




interface IProps {
    Cars: any[],
    selectNewCar: any,
    searchByTag: any,
}

export default class CarList extends React.Component<IProps, {}> {
    constructor(props: any) {
        super(props)   
        this.searchByTag = this.searchByTag.bind(this)
    }

	public render() {
		return (
			<div className="container car-list-wrapper">
                <div className="row car-list-heading">
                    <div className="input-group">
                        <input type="text" id="search-tag-textbox" className="form-control" placeholder="Search By Tags" />
                        <div className="input-group-append">
                            <div className="btn btn-outline-secondary search-button" onClick = {this.searchByTag}>Search</div>

                        </div>
                    </div>  
                </div>
                <div className="row car-list-table">
                    <table className="table table-striped">
                        <tbody>
                            {this.createTable()}
                        </tbody>
                    </table>
                </div>
            </div>
            
		);
    }

    // Construct table using car list
	private createTable() {
        const table:any[] = []
        const carList = this.props.Cars
        if (carList == null) {
            return table
        }

        for (let i = 0; i < carList.length; i++) {
            const children = []
            const car = carList[i]
            children.push(<td key={"id" + i}>{car.id}</td>)
            children.push(<td key={"name" + i}>{car.title}</td>)
            children.push(<td key={"tags" + i}>{car.tags}</td>)
            table.push(<tr key={i+""} id={i+""} onClick= {this.selectRow.bind(this, i)}>{children}</tr>)
        }
        return table
    }
    
    // car selection handler to display selected car in details component
    private selectRow(index: any) {
        const selectedCar = this.props.Cars[index]
        if (selectedCar != null) {
            this.props.selectNewCar(selectedCar)
        }
    }

    // Search car by tag
    private searchByTag() {
        const textBox = document.getElementById("search-tag-textbox") as HTMLInputElement
        if (textBox === null) {
            return;
        }
        const tag = textBox.value 
        this.props.searchByTag(tag)  
    }

}