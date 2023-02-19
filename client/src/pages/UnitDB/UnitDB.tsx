import React from 'react';
import FormControl from 'react-bootstrap/FormControl';
import { Link } from 'react-router-dom';
import { HeroDataModel } from '../../models';
import UnitIcon from './Components/UnitIcon';

interface UnitDBProps {
  heroList: HeroDataModel[],
}

// eslint-disable-next-line react/prefer-stateless-function
class UnitDB extends React.Component<UnitDBProps, { unit: string }> {
  constructor(props: UnitDBProps) {
    super(props);

    this.state = {
      unit: '',
    };

    this.handleUnitChange = this.handleUnitChange.bind(this);
  }

  handleUnitChange(e: any) {
    this.setState({ unit: (e.target as HTMLInputElement).value });
  }

  render() {
    const { unit } = this.state;
    const { heroList } = this.props;
    return (
      <div>
        <FormControl
          type="text"
          value={unit}
          onChange={this.handleUnitChange}
          placeholder="Filter"
        />
        <div className="d-flex flex-wrap" style={{ backgroundColor: 'white' }}>
          {
            heroList.map((h) => (h.name.toLowerCase().includes(unit.toLowerCase()) || unit === '') && (
              <Link to={`/unit-db/${h.id_num}`}><UnitIcon hero={h} /></Link>
            ))
          }
        </div>
      </div>
    );
  }
}
export default UnitDB;
