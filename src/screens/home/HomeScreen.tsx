import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useAppSelector } from '../../hooks/redux';
import { COLORS, FONTS, SIZES, SPACING, BORDER_RADIUS } from '../../constants';

const { width } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const { user } = useAppSelector(state => state.auth);

  const quickActions = [
    { id: 1, title: 'Add Task', icon: '📝', color: COLORS.primary },
    { id: 2, title: 'Schedule', icon: '📅', color: COLORS.secondary },
    { id: 3, title: 'Notes', icon: '📋', color: COLORS.accent },
    { id: 4, title: 'Reminders', icon: '🔔', color: COLORS.success },
  ];

  const recentItems = [
    { id: 1, title: 'Team Meeting', time: '2:00 PM', type: 'Meeting' },
    { id: 2, title: 'Buy groceries', time: '4:30 PM', type: 'Task' },
    { id: 3, title: 'Call mom', time: '6:00 PM', type: 'Reminder' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Welcome Section */}
      <LinearGradient
        colors={[COLORS.primary, COLORS.primaryDark]}
        style={styles.welcomeSection}
      >
        <Text style={styles.welcomeText}>
          Welcome back, {user?.name || 'User'}! 👋
        </Text>
        <Text style={styles.subtitleText}>
          Here's what's happening today
        </Text>
      </LinearGradient>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={[styles.quickActionCard, { backgroundColor: action.color }]}
            >
              <Text style={styles.quickActionIcon}>{action.icon}</Text>
              <Text style={styles.quickActionTitle}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Today's Overview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Overview</Text>
        <View style={styles.overviewCard}>
          <View style={styles.overviewItem}>
            <Text style={styles.overviewNumber}>3</Text>
            <Text style={styles.overviewLabel}>Tasks</Text>
          </View>
          <View style={styles.overviewItem}>
            <Text style={styles.overviewNumber}>1</Text>
            <Text style={styles.overviewLabel}>Meetings</Text>
          </View>
          <View style={styles.overviewItem}>
            <Text style={styles.overviewNumber}>2</Text>
            <Text style={styles.overviewLabel}>Reminders</Text>
          </View>
        </View>
      </View>

      {/* Recent Items */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Items</Text>
        {recentItems.map((item) => (
          <TouchableOpacity key={item.id} style={styles.recentItem}>
            <View style={styles.recentItemContent}>
              <Text style={styles.recentItemTitle}>{item.title}</Text>
              <Text style={styles.recentItemTime}>{item.time}</Text>
            </View>
            <View style={[styles.recentItemBadge, { backgroundColor: getTypeColor(item.type) }]}>
              <Text style={styles.recentItemBadgeText}>{item.type}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tips Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Daily Tip</Text>
        <View style={styles.tipCard}>
          <Text style={styles.tipIcon}>💡</Text>
          <Text style={styles.tipText}>
            Break your tasks into smaller chunks to stay focused and productive throughout the day.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'Meeting':
      return COLORS.primary;
    case 'Task':
      return COLORS.accent;
    case 'Reminder':
      return COLORS.secondary;
    default:
      return COLORS.textSecondary;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  welcomeSection: {
    padding: SPACING.xl,
    marginBottom: SPACING.lg,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: SPACING.sm,
    fontFamily: FONTS.bold,
  },
  subtitleText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    fontFamily: FONTS.regular,
  },
  section: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.md,
    fontFamily: FONTS.bold,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: (width - SPACING.lg * 2 - SPACING.md) / 2,
    height: 100,
    borderRadius: BORDER_RADIUS.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionIcon: {
    fontSize: 24,
    marginBottom: SPACING.sm,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    fontFamily: FONTS.medium,
  },
  overviewCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  overviewItem: {
    flex: 1,
    alignItems: 'center',
  },
  overviewNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    fontFamily: FONTS.bold,
  },
  overviewLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
    fontFamily: FONTS.regular,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  recentItemContent: {
    flex: 1,
  },
  recentItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.xs,
    fontFamily: FONTS.medium,
  },
  recentItemTime: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: FONTS.regular,
  },
  recentItemBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
  },
  recentItemBadgeText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '600',
    fontFamily: FONTS.medium,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.accent,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    alignItems: 'center',
  },
  tipIcon: {
    fontSize: 24,
    marginRight: SPACING.md,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: 'white',
    lineHeight: 20,
    fontFamily: FONTS.regular,
  },
});

export default HomeScreen;
