import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Header from '../../components/common/Header';

// Placeholder cart items
const initialCartItems = [
  {
    id: '1',
    name: 'Mathematics Course',
    price: 49.99,
    image: 'https://img.icons8.com/color/96/000000/math.png',
    consultantLevel: 'Senior',
    quantity: 1,
  },
  {
    id: '2',
    name: 'Science Course',
    price: 39.99,
    image: 'https://img.icons8.com/color/96/000000/physics.png',
    consultantLevel: 'Junior',
    quantity: 1,
  },
];

const MyCart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleIncrement = (id: string) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const handleDecrement = (id: string) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const handleDelete = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const renderItem = ({ item }: { item: (typeof initialCartItems)[0] }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemSubheading}>
          {item.consultantLevel} Consultant
        </Text>
        <Text style={styles.itemPrice}>
          ${(item.price * item.quantity).toFixed(2)}
        </Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          onPress={() => handleDecrement(item.id)}
          style={styles.quantityButton}
          accessibilityRole="button"
        >
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity
          onPress={() => handleIncrement(item.id)}
          style={styles.quantityButton}
          accessibilityRole="button"
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => handleDelete(item.id)}
        style={styles.deleteButton}
        accessibilityRole="button"
      >
        <Text style={styles.deleteButtonText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="My Cart" />
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Your cart is empty.</Text>
        }
      />

      {/* Summary Section */}
      <Text style={styles.summaryTitle}>Summary</Text>
      <View style={styles.summaryBox}>
        <TouchableOpacity style={styles.paymentRow} accessibilityRole="button">
          <Text style={styles.paymentTitle}>Payment Method</Text>
          <View style={styles.paymentRowLeft}>
            <Text style={styles.arrow}>&#8594;</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.paymentMethodDetailRow}>
          <View style={styles.paymentMethodLeft}>
            <Image
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png',
              }}
              style={styles.paymentIcon}
            />
            <Text style={styles.paymentMethodDetailText}>Visa **** 1234</Text>
          </View>
          <Text style={styles.greenTick}>✅</Text>
        </View>
        <Text style={styles.orderInfoHeading}>Order Info</Text>
        <View style={styles.orderInfoRow}>
          <Text style={styles.orderInfoLabel}>Subtotal</Text>
          <Text style={styles.orderInfoValue}>${total.toFixed(2)}</Text>
        </View>
        <View style={styles.orderInfoRow}>
          <Text style={styles.orderInfoLabel}>Shipping Cost</Text>
          <Text style={styles.orderInfoValue}>$5.00</Text>
        </View>
        <View style={styles.orderInfoRow}>
          <Text style={styles.orderInfoLabelTotal}>Total</Text>
          <Text style={styles.orderInfoValueTotal}>
            ${(total + 5).toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.proceedButton}
          accessibilityRole="button"
        >
          <Text style={styles.proceedButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>

      {/* Footer removed as per new design: only one button remains in summary */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    // Shadow for iOS
  },
  title: {
    fontFamily: 'DM Sans',
    fontWeight: '600',
    fontSize: 15.08,
    lineHeight: 16.76,
    textTransform: 'capitalize',
    color: '#222',
    alignSelf: 'center',
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
  },
  quantityContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    marginRight: 12,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 4,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginVertical: 2,
  },
  itemImage: {
    width: 56.98,
    height: 56.98,
    borderRadius: 5.03,
    opacity: 1,
    marginRight: 16,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  itemSubheading: {
    fontFamily: 'DM Sans',
    fontWeight: '400',
    fontSize: 10.05,
    lineHeight: 13.41,
    letterSpacing: 0.2, // 2% of 10.05px ≈ 0.2
    color: '#666',
    marginTop: 2,
    marginBottom: 2,
  },
  itemPrice: {
    fontFamily: 'DM Sans',
    fontWeight: '400',
    fontSize: 10.05,
    lineHeight: 13.41,
    letterSpacing: 0.2, // 2% of 10.05px ≈ 0.2
    color: '#888',
    marginTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
    marginTop: 40,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  totalText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
  },
  checkoutButton: {
    backgroundColor: '#FFCB4B',
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 8,
  },
  checkoutText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  deleteButton: {
    marginLeft: 3,
    padding: 6,
  },
  deleteButtonText: {
    fontSize: 20,
  },
  // Add summary styles
  summaryTitle: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 32,
    letterSpacing: 0,
    color: '#222',
    marginTop: 10,
    marginBottom: 8,
    textAlign: 'center',
  },
  summaryBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    alignSelf: 'stretch',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  paymentRowLeft: {
    width: 24,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  paymentTitle: {
    fontFamily: 'DM Sans',
    fontWeight: '500',
    fontSize: 14,
    color: '#333',
  },
  paymentRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentMethod: {
    fontFamily: 'DM Sans',
    fontWeight: '400',
    fontSize: 13,
    color: '#222',
    marginRight: 6,
  },
  arrow: {
    fontSize: 18,
    color: '#888',
  },
  orderInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  orderInfoLabel: {
    fontFamily: 'DM Sans',
    fontWeight: '400',
    fontSize: 13,
    color: '#666',
  },
  orderInfoValue: {
    fontFamily: 'DM Sans',
    fontWeight: '400',
    fontSize: 13,
    color: '#222',
  },
  orderInfoLabelTotal: {
    fontFamily: 'DM Sans',
    fontWeight: '700',
    fontSize: 15,
    color: '#222',
  },
  orderInfoValueTotal: {
    fontFamily: 'DM Sans',
    fontWeight: '700',
    fontSize: 15,
    color: '#222',
  },
  proceedButton: {
    backgroundColor: '#FFCB4B',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  proceedButtonText: {
    fontFamily: 'DM Sans',
    fontWeight: '700',
    fontSize: 16,
    color: '#000',
  },
  // Add styles for payment method detail row and tick
  paymentMethodDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: -8,
  },
  paymentMethodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentIcon: {
    width: 32,
    height: 20,
    resizeMode: 'contain',
    marginRight: 8,
  },
  paymentMethodDetailText: {
    fontFamily: 'DM Sans',
    fontWeight: '500',
    fontSize: 14,
    color: '#222',
  },
  greenTick: {
    fontSize: 20,
    color: 'green',
  },
  orderInfoHeading: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 17,
    lineHeight: 18.7, // 110% of 17px
    letterSpacing: 0,
    color: '#222',
    marginBottom: 8,
  },
});

export default MyCart;
