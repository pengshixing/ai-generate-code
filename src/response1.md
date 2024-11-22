```jsx
import React from 'react';

class Table extends React.Component {
    render() {
        // Extract data and columns from props
        const { data, columns } = this.props;

        return (
            <table>
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index}>{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            {columns.map((column, colIndex) => (
                                <td key={colIndex}>{row[column]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}

export default Table;
```

用法：

```jsx
import React from 'react';
import Table from './Table';

class App extends React.Component {

    render() {
        const data = [
            { name: 'Joe', age: 20, job: 'plumber' },
            { name: 'Jane', age: 24, job: 'electrician' }
        ];
        const columns = ['name', 'age', 'job'];

        return (
            <Table data={data} columns={columns} />
        );
    }
};

export default App;
```
