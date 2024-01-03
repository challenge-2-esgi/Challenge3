enum Role { client, deliverer }

class User {
  final String id;
  final String lastname;
  final String firstname;
  final String email;
  final String role;

  // deliverer
  final String? delivererId;
  final String? phone;
  final bool? isActive;

  User({
    required this.id,
    required this.lastname,
    required this.firstname,
    required this.email,
    required this.role,
    this.delivererId,
    this.phone,
    this.isActive,
  });

  static String roleToString(Role role) {
    if (role == Role.client) return "CLIENT";
    return "DELIVERER";
  }

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      lastname: json['lastname'],
      firstname: json['firstname'],
      email: json['email'],
      role: json['role'],
      delivererId: json['delivererId'],
      phone: json['phone'],
      isActive: json['isActive'],
    );
  }

  User copyWith({
    String? id,
    String? lastname,
    String? firstname,
    String? email,
    String? role,
    String? delivererId,
    String? phone,
    bool? isActive,
  }) {
    return User(
      id: id ?? this.id,
      lastname: lastname ?? this.lastname,
      firstname: firstname ?? this.firstname,
      email: email ?? this.email,
      role: role ?? this.role,
      delivererId: delivererId ?? this.delivererId,
      phone: phone ?? this.phone,
      isActive: isActive ?? this.isActive,
    );
  }
}
