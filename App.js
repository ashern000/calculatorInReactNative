import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num1: '',
      num2: '',
      resultado: '',
      historico: []  // Array para armazenar o histórico de operações
    };
  }

  handleSoma = () => {
    const res = parseFloat(this.state.num1) + parseFloat(this.state.num2);
    const novaOperacao = `${this.state.num1} + ${this.state.num2} = ${res}`;
    this.setState(prevState => ({
      resultado: res.toString(),
      historico: [...prevState.historico, novaOperacao] // Adiciona ao histórico
    }));
  };

  handleSubtracao = () => {
    const res = parseFloat(this.state.num1) - parseFloat(this.state.num2);
    const novaOperacao = `${this.state.num1} - ${this.state.num2} = ${res}`;
    this.setState(prevState => ({
      resultado: res.toString(),
      historico: [...prevState.historico, novaOperacao] // Adiciona ao histórico
    }));
  };

  handleMultiplicacao = () => {
    const res = parseFloat(this.state.num1) * parseFloat(this.state.num2);
    const novaOperacao = `${this.state.num1} * ${this.state.num2} = ${res}`;
    this.setState(prevState => ({
      resultado: res.toString(),
      historico: [...prevState.historico, novaOperacao] // Adiciona ao histórico
    }));
  };

  handleDivisao = () => {
    if (parseFloat(this.state.num2) === 0) {
      this.setState({ resultado: 'Erro: Divisão por zero' });
    } else {
      const res = parseFloat(this.state.num1) / parseFloat(this.state.num2);
      const novaOperacao = `${this.state.num1} / ${this.state.num2} = ${res}`;
      this.setState(prevState => ({
        resultado: res.toString(),
        historico: [...prevState.historico, novaOperacao] // Adiciona ao histórico
      }));
    }
  };

  handleLimpar = () => {
    this.setState({ num1: '', num2: '', resultado: '' });
  };

  renderItem = ({ item }) => (
    <Text style={styles.historicoItem}>{item}</Text>
  );

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>CalculatorInReactNative</Text>

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Digite o primeiro número"
          onChangeText={text => this.setState({ num1: text })}
          value={this.state.num1}
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Digite o segundo número"
          onChangeText={text => this.setState({ num2: text })}
          value={this.state.num2}
        />

        <View style={styles.buttonContainer}>
          <Button title="+" onPress={this.handleSoma} />
          <Button title="-" onPress={this.handleSubtracao} />
          <Button title="*" onPress={this.handleMultiplicacao} />
          <Button title="/" onPress={this.handleDivisao} />
        </View>

        <View style={styles.clearContainer}>
          <Button title="Limpar" onPress={this.handleLimpar} color="red" />
        </View>

        <Text style={styles.result}>Resultado: {this.state.resultado}</Text>

        {/* Exibe o histórico */}
        <Text style={styles.historicoTitle}>Histórico de Operações:</Text>
        <FlatList
          data={this.state.historico}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    width: '80%',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 20,
  },
  clearContainer: {
    marginBottom: 20,
    width: '80%',
  },
  result: {
    fontSize: 20,
    marginTop: 20,
  },
  historicoTitle: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: 'bold',
  },
  historicoItem: {
    fontSize: 16,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default App;
