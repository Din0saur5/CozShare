"""empty message

Revision ID: 148483f9f57c
Revises: 6f688c7e16c4
Create Date: 2024-01-03 22:47:39.342392

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '148483f9f57c'
down_revision = '6f688c7e16c4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('comments', schema=None) as batch_op:
        batch_op.drop_index('ix_comments_created')
        batch_op.drop_constraint('comments_user_id_fkey', type_='foreignkey')
        batch_op.create_foreign_key(batch_op.f('fk_comments_user_id_users'), 'users', ['user_id'], ['id'])

    with op.batch_alter_table('event_posts', schema=None) as batch_op:
        batch_op.drop_constraint('event_posts_event_id_fkey', type_='foreignkey')
        batch_op.drop_constraint('event_posts_post_id_fkey', type_='foreignkey')
        batch_op.create_foreign_key(batch_op.f('fk_event_posts_event_id_events'), 'events', ['event_id'], ['id'], ondelete='CASCADE')
        batch_op.create_foreign_key(batch_op.f('fk_event_posts_post_id_posts'), 'posts', ['post_id'], ['id'], ondelete='CASCADE')

    with op.batch_alter_table('events', schema=None) as batch_op:
        batch_op.drop_index('ix_events_eventTime')
        batch_op.create_index(batch_op.f('ix_events_created'), ['created'], unique=False)
        batch_op.drop_constraint('events_admin_id_fkey', type_='foreignkey')
        batch_op.create_foreign_key(batch_op.f('fk_events_admin_id_users'), 'users', ['admin_id'], ['id'])

    with op.batch_alter_table('members', schema=None) as batch_op:
        batch_op.drop_constraint('members_event_id_fkey', type_='foreignkey')
        batch_op.drop_constraint('members_user_id_fkey', type_='foreignkey')
        batch_op.create_foreign_key(batch_op.f('fk_members_user_id_users'), 'users', ['user_id'], ['id'], ondelete='CASCADE')
        batch_op.create_foreign_key(batch_op.f('fk_members_event_id_events'), 'events', ['event_id'], ['id'], ondelete='CASCADE')

    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.alter_column('caption',
               existing_type=sa.VARCHAR(),
               type_=sa.TEXT(),
               existing_nullable=True)
        batch_op.drop_index('ix_posts_created')
        batch_op.create_index(batch_op.f('ix_posts_created'), ['created'], unique=False)
        batch_op.drop_constraint('posts_user_id_fkey', type_='foreignkey')
        batch_op.create_foreign_key(batch_op.f('fk_posts_user_id_users'), 'users', ['user_id'], ['id'])

    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('following',
               existing_type=postgresql.ARRAY(sa.TEXT()),
               nullable=True)
        batch_op.alter_column('followers',
               existing_type=postgresql.ARRAY(sa.TEXT()),
               nullable=True)
        batch_op.alter_column('display_name',
               existing_type=sa.VARCHAR(),
               type_=sa.TEXT(),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('display_name',
               existing_type=sa.TEXT(),
               type_=sa.VARCHAR(),
               existing_nullable=False)
        batch_op.alter_column('followers',
               existing_type=postgresql.ARRAY(sa.TEXT()),
               nullable=False)
        batch_op.alter_column('following',
               existing_type=postgresql.ARRAY(sa.TEXT()),
               nullable=False)

    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_posts_user_id_users'), type_='foreignkey')
        batch_op.create_foreign_key('posts_user_id_fkey', 'users', ['user_id'], ['id'], onupdate='CASCADE', ondelete='CASCADE')
        batch_op.drop_index(batch_op.f('ix_posts_created'))
        batch_op.create_index('ix_posts_created', ['created'], unique=False)
        batch_op.alter_column('caption',
               existing_type=sa.TEXT(),
               type_=sa.VARCHAR(),
               existing_nullable=True)

    with op.batch_alter_table('members', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_members_event_id_events'), type_='foreignkey')
        batch_op.drop_constraint(batch_op.f('fk_members_user_id_users'), type_='foreignkey')
        batch_op.create_foreign_key('members_user_id_fkey', 'users', ['user_id'], ['id'], onupdate='CASCADE', ondelete='CASCADE')
        batch_op.create_foreign_key('members_event_id_fkey', 'events', ['event_id'], ['id'], onupdate='CASCADE', ondelete='CASCADE')

    with op.batch_alter_table('events', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_events_admin_id_users'), type_='foreignkey')
        batch_op.create_foreign_key('events_admin_id_fkey', 'users', ['admin_id'], ['id'], onupdate='CASCADE', ondelete='CASCADE')
        batch_op.drop_index(batch_op.f('ix_events_created'))
        batch_op.create_index('ix_events_eventTime', ['eventTime'], unique=False)

    with op.batch_alter_table('event_posts', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_event_posts_post_id_posts'), type_='foreignkey')
        batch_op.drop_constraint(batch_op.f('fk_event_posts_event_id_events'), type_='foreignkey')
        batch_op.create_foreign_key('event_posts_post_id_fkey', 'posts', ['post_id'], ['id'], onupdate='CASCADE', ondelete='CASCADE')
        batch_op.create_foreign_key('event_posts_event_id_fkey', 'events', ['event_id'], ['id'], onupdate='CASCADE', ondelete='CASCADE')

    with op.batch_alter_table('comments', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_comments_user_id_users'), type_='foreignkey')
        batch_op.create_foreign_key('comments_user_id_fkey', 'users', ['user_id'], ['id'], onupdate='CASCADE', ondelete='CASCADE')
        batch_op.create_index('ix_comments_created', ['created'], unique=False)

    # ### end Alembic commands ###