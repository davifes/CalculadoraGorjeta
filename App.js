import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

export default function App() {
  // Estados para armazenar as entradas do usuário
  const [billAmount, setBillAmount] = useState('');
  const [tipPercentage, setTipPercentage] = useState('10'); // Valor padrão de 10%
  const [numPeople, setNumPeople] = useState('1');

  // Estados para exibir os resultados
  const [results, setResults] = useState(null);

  const calculateTip = () => {
    Keyboard.dismiss(); // Fecha o teclado ao calcular

    const bill = parseFloat(billAmount.replace(',', '.'));
    const tip = parseFloat(tipPercentage.replace(',', '.'));
    const people = parseInt(numPeople, 10);

    // Validações básicas
    if (isNaN(bill) || bill <= 0) {
      alert('Por favor, insira um valor válido para a conta.');
      return;
    }

    if (isNaN(tip) || tip < 0) {
      alert('Por favor, insira um percentual de gorjeta válido.');
      return;
    }

    if (isNaN(people) || people <= 0) {
      alert('O número de pessoas deve ser pelo menos 1.');
      return;
    }

    // Cálculos
    const tipValue = (bill * tip) / 100;
    const totalBill = bill + tipValue;
    const perPerson = totalBill / people;

    setResults({
      tipValue: tipValue.toFixed(2),
      totalBill: totalBill.toFixed(2),
      perPerson: perPerson.toFixed(2),
    });
  };

  const handleReset = () => {
    setBillAmount('');
    setTipPercentage('10');
    setNumPeople('1');
    setResults(null);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Cabeçalho */}
          <Text style={styles.title}>Cálculo de Gorjeta</Text>

          {/* Identificação dos integrantes */}
          <View style={styles.cardHeader}>
            <Text style={styles.membersLabel}>Integrantes do Grupo:</Text>
            <Text style={styles.memberName}>1. [Davi Felipe da Silva]</Text>
            <Text style={styles.memberName}>2. [Nome do Aluno 2]</Text>
          </View>

          {/* Formulário de Entrada */}
          <View style={styles.card}>
            <Text style={styles.inputLabel}>Valor da Conta (R$)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 150.00"
              keyboardType="numeric"
              value={billAmount}
              onChangeText={setBillAmount}
            />

            <Text style={styles.inputLabel}>Percentual de Gorjeta (%)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 10"
              keyboardType="numeric"
              value={tipPercentage}
              onChangeText={setTipPercentage}
            />

            <Text style={styles.inputLabel}>Número de Pessoas</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 2"
              keyboardType="numeric"
              value={numPeople}
              onChangeText={setNumPeople}
            />

            <TouchableOpacity style={styles.button} onPress={calculateTip}>
              <Text style={styles.buttonText}>Calcular</Text>
            </TouchableOpacity>

            {results && (
              <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
                <Text style={styles.resetButtonText}>Limpar</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Resultados */}
          {results && (
            <View style={styles.resultCard}>
              <Text style={styles.resultTitle}>Resumo da Conta</Text>

              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Valor da Gorjeta:</Text>
                <Text style={styles.resultValue}>R$ {results.tipValue}</Text>
              </View>

              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Valor Total (Conta + Gorjeta):</Text>
                <Text style={styles.resultValue}>R$ {results.totalBill}</Text>
              </View>

              <View style={[styles.resultRow, styles.highlightRow]}>
                <Text style={styles.highlightLabel}>Valor por Pessoa:</Text>
                <Text style={styles.highlightValue}>R$ {results.perPerson}</Text>
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scrollContent: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1F2937',
    marginBottom: 16,
  },
  cardHeader: {
    backgroundColor: '#E5E7EB',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  membersLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 4,
  },
  memberName: {
    fontSize: 14,
    color: '#4B5563',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 14,
    backgroundColor: '#F9FAFB',
  },
  button: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resetButton: {
    marginTop: 10,
    alignItems: 'center',
    paddingVertical: 8,
  },
  resetButtonText: {
    color: '#6B7280',
    fontSize: 14,
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 18,
    borderLeftWidth: 5,
    borderLeftColor: '#10B981',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  resultLabel: {
    fontSize: 15,
    color: '#4B5563',
  },
  resultValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
  },
  highlightRow: {
    borderBottomWidth: 0,
    marginTop: 8,
    paddingTop: 8,
  },
  highlightLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10B981',
  },
  highlightValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#10B981',
  },
});