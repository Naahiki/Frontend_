import { Component } from "react";
import PropTypes from "prop-types";
import "./Filter.css";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destination: "",
      category: "",
      startMonth: "",
      endMonth: "",
      minPrice: "",
      maxPrice: ""
    };
  }

  handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newValue = name.includes("Price") ? parseFloat(value) || "" : value;

    this.setState(
      { [name]: newValue },
      () => this.props.onFilterChange(this.state)
    );
  };

  handleReset = () => {
    this.setState(
      {
        destination: "",
        category: "",
        startMonth: "",
        endMonth: "",
        minPrice: "",
        maxPrice: ""
      },
      () => this.props.onFilterChange(this.state)
    );
  };

  render() {
    return (
      <div className="filter-container">
        <h3>Filtrar Paquetes de Viaje</h3>
        <div className="filter-types-container">
          <div className="filter-item">
            <label htmlFor="destination">Destino</label>
            <input
              type="text"
              id="destination"
              name="destination"
              placeholder="Ej. París, Tokyo"
              value={this.state.destination}
              onChange={this.handleFilterChange}
            />
          </div>

          <div className="filter-item">
            <label htmlFor="category">Categoría</label>
            <select
              id="category"
              name="category"
              value={this.state.category}
              onChange={this.handleFilterChange}
            >
              <option value="">Todas las categorías</option>
              <option value="Aventura">Aventura</option>
              <option value="Relax">Relax</option>
              <option value="Cultural">Cultural</option>
              <option value="Familiar">Familiar</option>
              <option value="Rural">Rural</option>
              <option value="Cultural">Cultural</option>


            </select>
          </div>

          <div className="filter-item">
            <label htmlFor="startMonth">Mes de Inicio</label>
            <select
              id="startMonth"
              name="startMonth"
              value={this.state.startMonth}
              onChange={this.handleFilterChange}
            >
              <option value="">Cualquier mes</option>
              <option value="Enero">Enero</option>
              <option value="Febrero">Febrero</option>
              <option value="Marzo">Marzo</option>
              <option value="Abril">Abril</option>
              <option value="Mayo">Mayo</option>
              <option value="Junio">Junio</option>
              <option value="Julio">Julio</option>
              <option value="Agosto">Agosto</option>
              <option value="Septiembre">Septiembre</option>
              <option value="Octubre">Octubre</option>
              <option value="Noviembre">Noviembre</option>
              <option value="Diciembre">Diciembre</option>
            </select>
          </div>

          <div className="filter-item">
            <label htmlFor="endMonth">Mes de Fin</label>
            <select
              id="endMonth"
              name="endMonth"
              value={this.state.endMonth}
              onChange={this.handleFilterChange}
            >
              <option value="">Cualquier mes</option>
              <option value="Enero">Enero</option>
              <option value="Febrero">Febrero</option>
              <option value="Marzo">Marzo</option>
              <option value="Abril">Abril</option>
              <option value="Mayo">Mayo</option>
              <option value="Junio">Junio</option>
              <option value="Julio">Julio</option>
              <option value="Agosto">Agosto</option>
              <option value="Septiembre">Septiembre</option>
              <option value="Octubre">Octubre</option>
              <option value="Noviembre">Noviembre</option>
              <option value="Diciembre">Diciembre</option>
            </select>
          </div>

          <div className="filter-item">
            <label htmlFor="minPrice">Precio Mínimo</label>
            <input
              type="number"
              id="minPrice"
              name="minPrice"
              placeholder="Desde"
              value={this.state.minPrice}
              onChange={this.handleFilterChange}
            />
          </div>

          <div className="filter-item">
            <label htmlFor="maxPrice">Precio Máximo</label>
            <input
              type="number"
              id="maxPrice"
              name="maxPrice"
              placeholder="Hasta"
              value={this.state.maxPrice}
              onChange={this.handleFilterChange}
            />
          </div>
        </div>

        <button className="reset-btn" onClick={this.handleReset}>
          Resetear Filtros
        </button>
      </div>
    );
  }
}

Filter.propTypes = {
  onFilterChange: PropTypes.func.isRequired
};

export default Filter;
