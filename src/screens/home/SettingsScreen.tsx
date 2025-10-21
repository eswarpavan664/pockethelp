import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { COLORS, FONTS, SIZES, SPACING, BORDER_RADIUS } from '../../constants';

const SettingsScreen: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSync, setAutoSync] = useState(true);

  const handleClearCache = () => {
    Alert.alert(
      'Clear Cache',
      'This will clear all cached data. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', style: 'destructive', onPress: () => {} },
      ]
    );
  };

  const handleResetSettings = () => {
    Alert.alert(
      'Reset Settings',
      'This will reset all settings to default. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reset', style: 'destructive', onPress: () => {} },
      ]
    );
  };

  const settingsSections = [
    {
      title: 'Preferences',
      items: [
        {
          id: 1,
          title: 'Notifications',
          subtitle: 'Receive push notifications',
          type: 'switch',
          value: notifications,
          onPress: () => setNotifications(!notifications),
        },
        {
          id: 2,
          title: 'Dark Mode',
          subtitle: 'Use dark theme',
          type: 'switch',
          value: darkMode,
          onPress: () => setDarkMode(!darkMode),
        },
        {
          id: 3,
          title: 'Auto Sync',
          subtitle: 'Automatically sync data',
          type: 'switch',
          value: autoSync,
          onPress: () => setAutoSync(!autoSync),
        },
      ],
    },
    {
      title: 'Data & Storage',
      items: [
        {
          id: 4,
          title: 'Clear Cache',
          subtitle: 'Free up storage space',
          type: 'action',
          onPress: handleClearCache,
        },
        {
          id: 5,
          title: 'Export Data',
          subtitle: 'Download your data',
          type: 'action',
          onPress: () => {},
        },
        {
          id: 6,
          title: 'Import Data',
          subtitle: 'Restore from backup',
          type: 'action',
          onPress: () => {},
        },
      ],
    },
    {
      title: 'Account',
      items: [
        {
          id: 7,
          title: 'Change Password',
          subtitle: 'Update your password',
          type: 'action',
          onPress: () => {},
        },
        {
          id: 8,
          title: 'Privacy Settings',
          subtitle: 'Manage your privacy',
          type: 'action',
          onPress: () => {},
        },
        {
          id: 9,
          title: 'Delete Account',
          subtitle: 'Permanently delete account',
          type: 'action',
          onPress: () => {},
        },
      ],
    },
    {
      title: 'About',
      items: [
        {
          id: 10,
          title: 'App Version',
          subtitle: '1.0.0',
          type: 'info',
          onPress: () => {},
        },
        {
          id: 11,
          title: 'Terms of Service',
          subtitle: 'Read our terms',
          type: 'action',
          onPress: () => {},
        },
        {
          id: 12,
          title: 'Privacy Policy',
          subtitle: 'Read our policy',
          type: 'action',
          onPress: () => {},
        },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {settingsSections.map((section, sectionIndex) => (
        <View key={sectionIndex} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <View style={styles.sectionContent}>
            {section.items.map((item, itemIndex) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.settingItem,
                  itemIndex === section.items.length - 1 && styles.lastItem,
                ]}
                onPress={item.type === 'action' ? item.onPress : undefined}
                disabled={item.type === 'switch' || item.type === 'info'}
              >
                <View style={styles.settingContent}>
                  <Text style={styles.settingTitle}>{item.title}</Text>
                  <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                </View>
                <View style={styles.settingRight}>
                  {item.type === 'switch' && (
                    <Switch
                      value={item.value}
                      onValueChange={item.onPress}
                      trackColor={{ false: COLORS.border, true: COLORS.primary }}
                      thumbColor={item.value ? 'white' : COLORS.textSecondary}
                    />
                  )}
                  {item.type === 'action' && (
                    <Text style={styles.arrow}>›</Text>
                  )}
                  {item.type === 'info' && (
                    <Text style={styles.infoText}>{item.subtitle}</Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      {/* Reset Settings Button */}
      <View style={styles.resetContainer}>
        <TouchableOpacity style={styles.resetButton} onPress={handleResetSettings}>
          <Text style={styles.resetButtonText}>Reset All Settings</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  section: {
    marginTop: SPACING.xl,
    paddingHorizontal: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.md,
    fontFamily: FONTS.bold,
  },
  sectionContent: {
    backgroundColor: 'white',
    borderRadius: BORDER_RADIUS.lg,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.xs,
    fontFamily: FONTS.medium,
  },
  settingSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: FONTS.regular,
  },
  settingRight: {
    alignItems: 'center',
  },
  arrow: {
    fontSize: 20,
    color: COLORS.textSecondary,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: FONTS.regular,
  },
  resetContainer: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
  },
  resetButton: {
    backgroundColor: COLORS.error,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.md,
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: FONTS.bold,
  },
});

export default SettingsScreen;
