import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Dongyi Guo',
      theme: ThemeData(primarySwatch: Colors.blue),
      home: const HomePage(),
    );
  }
}

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Dongyi Guo')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: const [
          SectionTile(title: 'Professional Experiences'),
          SectionTile(title: 'Educational Experiences'),
          SectionTile(title: 'Volunteer Experiences'),
          SectionTile(title: 'Skills'),
          SectionTile(title: 'Certificates'),
        ],
      ),
    );
  }
}

class SectionTile extends StatelessWidget {
  final String title;
  const SectionTile({required this.title, super.key});

  @override
  Widget build(BuildContext context) {
    return ExpansionTile(
      title: Text(title),
      children: [
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: Text('Content coming soon.'),
        )
      ],
    );
  }
}
